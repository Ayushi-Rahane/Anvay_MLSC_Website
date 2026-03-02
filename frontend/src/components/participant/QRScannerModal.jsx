import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, CheckCircle, AlertCircle, Camera, Keyboard } from 'lucide-react';
import { createSubmission } from '../../services/api';

const QRScannerModal = ({ isOpen, onClose, participantData }) => {
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [inputMode, setInputMode] = useState('scan'); // 'scan' or 'manual'
    const [manualCode, setManualCode] = useState('');

    useEffect(() => {
        if (!isOpen || inputMode !== 'scan' || scanResult || success) return;

        // Ensure DOM element is present before initializing
        const timeout = setTimeout(() => {
            const scanner = new Html5QrcodeScanner(
                'qr-reader',
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText) {
                try {
                    let roomId = decodedText;
                    if (decodedText.startsWith('{')) {
                        const parsed = JSON.parse(decodedText);
                        roomId = parsed.roomId;
                    }

                    setScanResult(roomId);
                    scanner.clear(); // Stop scanning once we got a result
                } catch (err) {
                    setError('Invalid QR Code format.');
                    scanner.clear();
                }
            }

            function onScanFailure(error) {
                // handle scan failure, ignore mostly
            }

            return () => {
                scanner.clear().catch(error => console.error('Failed to clear scanner', error));
            };
        }, 100);

        return () => clearTimeout(timeout);
    }, [isOpen, inputMode, scanResult, success]);

    const handleSubmit = async (codeToSubmit) => {
        const finalCode = codeToSubmit || scanResult;
        if (!finalCode) return;

        setLoading(true);
        setError('');

        try {
            await createSubmission({
                uce: participantData.citizenId,
                roomId: finalCode.trim().toLowerCase(),
                name: participantData.name,
                tier: participantData.currentTier
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit room completion');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setScanResult(null);
        setError('');
        setSuccess(false);
        setManualCode('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#0a0a1a] border border-gray-700 rounded-2xl p-6 w-full max-w-md relative flex flex-col max-h-[90vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-heading font-bold text-white mb-6 uppercase">
                    Submit Completion
                </h2>

                {success ? (
                    <div className="text-center py-8">
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <h3 className="text-lg font-bold text-white mb-2">Submission Successful!</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Your completion for room <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{scanResult || manualCode}</span> has been sent to the Admin queue.
                        </p>
                        <button
                            onClick={handleClose}
                            className="px-6 py-2 rounded-lg bg-green-500/20 text-green-400 font-bold border border-green-500/30 hover:bg-green-500/30 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {/* Tab Switcher */}
                        {!scanResult && (
                            <div className="flex p-1 bg-gray-800/50 rounded-lg mb-6">
                                <button
                                    onClick={() => { setInputMode('scan'); setError(''); }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${inputMode === 'scan' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Camera size={16} /> Scan QR
                                </button>
                                <button
                                    onClick={() => { setInputMode('manual'); setError(''); }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${inputMode === 'manual' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Keyboard size={16} /> Enter Code
                                </button>
                            </div>
                        )}

                        {inputMode === 'scan' && !scanResult && (
                            <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900/50">
                                <div id="qr-reader" className="w-full"></div>
                                {error && (
                                    <p className="text-red-400 text-sm text-center py-3 px-2 border-t border-gray-700">{error}</p>
                                )}
                            </div>
                        )}

                        {inputMode === 'manual' && !scanResult && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-2">Room Code</label>
                                    <input
                                        type="text"
                                        value={manualCode}
                                        onChange={(e) => setManualCode(e.target.value)}
                                        placeholder="e.g. room1"
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#F9A24D] transition-colors font-mono"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Ask the room admin for the manual backup code if the QR scanner is not working.
                                    </p>
                                </div>
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-2 items-start text-red-400 text-sm">
                                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleSubmit(manualCode)}
                                    disabled={loading || !manualCode.trim()}
                                    className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-[#0a0a1a] transition-all disabled:opacity-50 mt-4"
                                    style={{ background: 'linear-gradient(135deg, #F9A24D, #ff6b35)' }}
                                >
                                    {loading ? 'Submitting...' : 'Submit Entry'}
                                </button>
                            </div>
                        )}

                        {scanResult && (
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-center">
                                    <CheckCircle size={32} className="mx-auto text-green-400 mb-2" />
                                    <p className="text-sm text-gray-400 mb-1">Scanned Room Code:</p>
                                    <p className="text-2xl font-mono text-white tracking-widest bg-gray-900 py-2 rounded-lg mt-2">{scanResult}</p>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-2 items-start text-red-400 text-sm">
                                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setScanResult(null);
                                            setError('');
                                        }}
                                        disabled={loading}
                                        className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={() => handleSubmit()}
                                        disabled={loading}
                                        className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider text-[#0a0a1a] transition-all disabled:opacity-50"
                                        style={{ background: 'linear-gradient(135deg, #F9A24D, #ff6b35)' }}
                                    >
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRScannerModal;
