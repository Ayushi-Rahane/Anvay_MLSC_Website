import React, { useState } from 'react';

const DNABadgePreview = ({ participantName, role, roomProgress, highestTier, teamName, roomsCompleted, firstRoomEntered, ROOMS_META }) => {
    const [copied, setCopied] = useState(false);

    const firstRoomName = firstRoomEntered
        ? ROOMS_META.find(r => r.id === firstRoomEntered)?.name || 'Unknown'
        : 'Not started';

    const metadata = {
        name: `BlockCity Citizen — ${participantName || 'Anonymous'}`,
        description: 'Official BlockCity graduate badge. Each badge is unique to one journey.',
        image: 'ipfs://YOUR_IMAGE_CID_HERE',
        attributes: [
            { trait_type: 'Role', value: role?.label || 'Unassigned' },
            { trait_type: 'First Room Entered', value: firstRoomName },
            { trait_type: 'Rooms Completed', value: roomsCompleted },
            { trait_type: 'Highest Tier Achieved', value: highestTier || 'None' },
            { trait_type: 'Team', value: teamName || 'Solo' },
            { trait_type: 'City', value: 'BlockCity' },
            { trait_type: 'Graduation Year', value: '2025' },
        ],
    };

    const metaString = JSON.stringify(metadata, null, 2);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(metaString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const traitColors = ['#F9A24D', '#f472b6', '#06b6d4', '#34d399', '#c084fc', '#00d4ff', '#fbbf24'];

    return (
        <div
            className="rounded-2xl border overflow-hidden"
            style={{
                background: 'rgba(10,10,26,0.95)',
                borderColor: 'rgba(249,162,77,0.2)',
                boxShadow: '0 0 40px rgba(249,162,77,0.08)',
            }}
        >
            {/* Header */}
            <div
                className="px-5 py-4 border-b flex items-center justify-between"
                style={{ borderColor: 'rgba(249,162,77,0.15)', background: 'rgba(249,162,77,0.04)' }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">🧬</span>
                    <div>
                        <h3 className="text-sm font-heading font-bold text-white">DNA Badge Preview</h3>
                        <p className="text-[10px] text-gray-500">Your unique NFT metadata</p>
                    </div>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all"
                    style={{
                        background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(249,162,77,0.1)',
                        border: `1px solid ${copied ? '#34d39950' : 'rgba(249,162,77,0.3)'}`,
                        color: copied ? '#34d399' : '#F9A24D',
                    }}
                >
                    {copied ? '✓ Copied' : 'Copy JSON'}
                </button>
            </div>

            {/* NFT Card Visual */}
            <div className="p-5">
                <div
                    className="rounded-xl p-4 mb-4 relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, #0a0a1a, #1a1a2e)`,
                        border: '1px solid rgba(249,162,77,0.2)',
                    }}
                >
                    {/* Animated grid background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(249,162,77,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(249,162,77,0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <div className="relative z-10 flex items-center gap-3 mb-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ background: 'rgba(249,162,77,0.1)', border: '1px solid rgba(249,162,77,0.3)' }}
                        >
                            {role?.emoji || '🏙️'}
                        </div>
                        <div>
                            <p className="text-white font-heading font-bold text-sm leading-tight">{metadata.name}</p>
                            <p className="text-gray-500 text-[10px] mt-0.5">{metadata.description.slice(0, 50)}...</p>
                        </div>
                    </div>

                    {/* Traits grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {metadata.attributes.map((attr, i) => (
                            <div
                                key={i}
                                className="rounded-lg px-3 py-2"
                                style={{ background: `${traitColors[i % traitColors.length]}08`, border: `1px solid ${traitColors[i % traitColors.length]}20` }}
                            >
                                <p className="text-[9px] uppercase tracking-widest" style={{ color: traitColors[i % traitColors.length] + '99' }}>
                                    {attr.trait_type}
                                </p>
                                <p className="text-white text-xs font-medium mt-0.5 truncate">
                                    {String(attr.value)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* JSON code block */}
                <div
                    className="rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-auto max-h-40"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)', color: '#6b7280' }}
                >
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{metaString}</pre>
                </div>
            </div>
        </div>
    );
};

export default DNABadgePreview;