import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Copy, ExternalLink, BookOpen, Code2, Zap } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const ROOM_CONTENT = {
    room_1: {
        persona: '⚖️ The City Judge',
        warmup: 'Imagine a coin-operated locker at a train station. You put money in, press a button, get your item. No cashier. No negotiation. The rules are built into the machine. Today we build that machine — in code.',
        entryPhrase: 'modifier',
        entryWhy: 'The most important safety concept in Solidity',
        concepts: [
            { term: 'pragma + SPDX', explain: 'Version + license header. Every Solidity file starts here.' },
            { term: 'contract keyword', explain: 'Groups variables and functions together — this IS the smart contract.' },
            { term: 'State variables', explain: 'Stored permanently on-chain. string public cityName; — public auto-creates a free getter.' },
            { term: 'constructor()', explain: 'Runs ONCE at deployment. Sets initial values. Like the contract\'s birth certificate.' },
            { term: 'msg.sender', explain: 'The address calling the function right now. How contracts know WHO is talking to them.' },
            { term: 'modifier', explain: 'Reusable condition. onlyOwner wraps any function — a reusable bouncer.' },
            { term: 'require()', explain: 'If false → transaction reverts entirely. Like a bouncer who turns you away at the door.' },
            { term: 'events + emit', explain: 'Logs stored on-chain. Frontends listen to them. Check Remix logs tab after calling.' },
        ],
        contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CityLaw {
    string public cityName;
    address public owner;
    uint public lawCount;

    event LawAdded(string lawText, address addedBy);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner!");
        _;
    }

    constructor(string memory _name) {
        cityName = _name;
        owner = msg.sender;
    }

    function addLaw(string memory _law) public onlyOwner {
        lawCount++;
        emit LawAdded(_law, msg.sender);
    }

    function getCityName() public view returns (string memory) {
        return cityName;
    }

    function setCity(string memory _name) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        cityName = _name;
    }
}`,
        challenge: 'Find and fix 2 bugs in BrokenCity.sol: (1) missing "public" on cityName, (2) wrong "internal" visibility on setCity(). Fixed contract must deploy and both functions must work.',
        builderTask: 'Add bool isPaused + pause()/unpause() with onlyOwner. Add a pausable modifier that blocks setCity() when paused.',
        architectTask: 'Multi-owner: mapping(address=>bool) isOwner, addOwner(), removeOwner(). Require 2-of-N owners to approve any law addition.',
        tools: [
            { label: 'Remix IDE', url: 'https://remix.ethereum.org', icon: '🔧' },
        ],
    },
    room_2: {
        persona: '💼 The Treasurer',
        warmup: 'A casino prints its own chips. It tracks who has how many on an internal ledger. The chips only work at that casino. The contract IS the casino. The mapping IS the ledger. We are building the casino today — and printing its chips.',
        entryPhrase: 'ERC-20',
        entryWhy: 'The standard that makes all tokens interoperable across the ecosystem',
        concepts: [
            { term: 'mapping(address=>uint256)', explain: 'Key-value store: address → balance. Think spreadsheet: column A = address, column B = balance.' },
            { term: 'ERC-20 interface', explain: '5 view functions + 3 transfer functions all tokens must implement. Universal compatibility.' },
            { term: 'OpenZeppelin import', explain: 'Audited contract library. Importing it = not reinventing the wheel with potential bugs.' },
            { term: 'Decimals (18)', explain: '1 token = 1 * 10^18 stored. Solidity has no floats. 100 * 10**decimals() = stored value.' },
            { term: '_mint()', explain: 'Creates tokens. Updates totalSupply and recipient\'s balance atomically.' },
            { term: 'Transfer internals', explain: '_transfer() checks balance, subtracts, adds. If balance insufficient → revert.' },
        ],
        contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CityToken is ERC20, Ownable {
    constructor() ERC20("CityToken","CTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    function rewardUser(address user, uint256 amount) public onlyOwner {
        _mint(user, amount * 10 ** decimals());
    }

    function readableBalance(address account)
        public view returns (uint256) {
        return balanceOf(account) / 10 ** decimals();
    }
}`,
        challenge: 'Step 1: Mint exactly 100 tokens to your wallet. Step 2: Transfer exactly 50 tokens to a teammate. Step 3: Show the transaction hash to mentor, verified on Polygonscan/Etherscan.',
        builderTask: 'Add burn(uint256 amount) function to let any holder destroy their tokens. Update totalSupply correctly.',
        architectTask: 'Staking system: stakedAmount + stakedAt, rewards calculated on unstake by time * rate.',
        tools: [
            { label: 'Remix IDE', url: 'https://remix.ethereum.org', icon: '🔧' },
            { label: 'Polygonscan Amoy', url: 'https://amoy.polygonscan.com', icon: '🔍' },
        ],
    },
    room_3: {
        persona: '🎨 The Identity Minister',
        warmup: 'A deed to a house: unique, only one exists, proves ownership. Cash is interchangeable — all £10 notes are identical. A deed is not. If I give you the deed, you own the house. NFTs are digital deeds. We are issuing deeds to digital identities today.',
        entryPhrase: 'tokenURI',
        entryWhy: 'The function that connects an NFT to its soul (its metadata)',
        concepts: [
            { term: 'ERC-721 vs ERC-20', explain: 'ERC-20: all tokens identical (cash). ERC-721: each has a unique ID (collectibles/deeds).' },
            { term: 'tokenId counter', explain: 'Every mint increments a counter. Token #0, #1, #2. uint256 tokenCounter.' },
            { term: 'ownerOf(tokenId)', explain: 'Returns address that owns that specific ID. Mapping updated automatically by _safeMint().' },
            { term: 'tokenURI(tokenId)', explain: 'Returns a URL (IPFS link) to a JSON file. That JSON IS the NFT\'s soul — name, image, traits.' },
            { term: 'Metadata JSON', explain: 'Standard: name, description, image (IPFS URL), attributes array.' },
            { term: 'IPFS upload', explain: 'nft.storage (free, browser): upload image → get CID → put in JSON → upload JSON → final URI.' },
            { term: '_safeMint()', explain: 'Assigns token to address, updates ownership mapping. All automatic from OpenZeppelin.' },
        ],
        contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CitizenBadge is ERC721, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => string) private tokenURIs;

    event BadgeMinted(address to, uint256 tokenId);

    constructor() ERC721("CitizenBadge","CBDG") Ownable(msg.sender) {}

    function mintBadge(
        address recipient,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        uint256 id = tokenCounter;
        tokenCounter++;
        _safeMint(recipient, id);
        tokenURIs[id] = metadataURI;
        emit BadgeMinted(recipient, id);
        return id;
    }

    function tokenURI(uint256 id)
        public view override returns (string memory) {
        require(id < tokenCounter, "Token does not exist");
        return tokenURIs[id];
    }
}`,
        challenge: 'Step 1: Write your personalised Block Badge metadata JSON with YOUR role/rooms/tier as traits. Step 2: Upload to IPFS via nft.storage. Step 3: Mint NFT. Step 4: Call tokenURI() — paste IPFS URL in browser — show metadata loading to mentor.',
        builderTask: 'Add batchMintBadge(address[] memory, string[] memory) — loop through arrays, mint to each. Great for certificates at scale.',
        architectTask: 'On-chain pseudo-random rarity: mapping(uint256=>uint256) rarityScore. On mint: rarityScore[id] = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, id))) % 100.',
        tools: [
            { label: 'Remix IDE', url: 'https://remix.ethereum.org', icon: '🔧' },
            { label: 'NFT.Storage', url: 'https://nft.storage', icon: '📦' },
        ],
    },
    room_4: {
        persona: '🏛️ The Council Speaker',
        warmup: 'A company board where every meeting is filmed, stored permanently, and publicly viewable. Every vote is on the record. No one can say they voted differently. The film cannot be edited. That is on-chain governance. We are building that board room today — run by code, not lawyers.',
        entryPhrase: 'quorum',
        entryWhy: 'The concept that prevents governance capture by small groups',
        concepts: [
            { term: 'struct Proposal', explain: 'Custom data type: title, description, yesVotes, noVotes, deadline, executed, proposer.' },
            { term: 'mapping(uint=>Proposal)', explain: 'Proposals stored by ID. Access with proposals[0], proposals[1].' },
            { term: 'block.timestamp', explain: 'Current Unix time on-chain. Deadline = block.timestamp + (minutes * 60).' },
            { term: 'hasVoted nested mapping', explain: 'mapping(proposalId => mapping(voterAddress => bool)). For proposal X, has address Y voted?' },
            { term: 'execute() conditions', explain: 'After deadline: yesVotes > noVotes + not already executed. In real DAOs this triggers treasury actions.' },
        ],
        contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CityVoting {
    struct Proposal {
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
        address proposer;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;

    event ProposalCreated(uint256 id, string title);
    event VoteCast(uint256 id, address voter, bool support);
    event ProposalExecuted(uint256 id);

    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _durationMinutes
    ) public returns (uint256) {
        uint256 id = proposalCount++;
        proposals[id] = Proposal({
            title: _title,
            description: _description,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + (_durationMinutes * 60),
            executed: false,
            proposer: msg.sender
        });
        emit ProposalCreated(id, _title);
        return id;
    }

    function vote(uint256 _id, bool _support) public {
        Proposal storage p = proposals[_id];
        require(block.timestamp < p.deadline, "Voting is closed");
        require(!hasVoted[_id][msg.sender], "Already voted!");
        hasVoted[_id][msg.sender] = true;
        if (_support) p.yesVotes++;
        else p.noVotes++;
        emit VoteCast(_id, msg.sender, _support);
    }

    function getResults(uint256 _id)
        public view
        returns (uint256 yes, uint256 no, bool passed) {
        Proposal storage p = proposals[_id];
        return (p.yesVotes, p.noVotes, p.yesVotes > p.noVotes);
    }

    function executeProposal(uint256 _id) public {
        Proposal storage p = proposals[_id];
        require(block.timestamp >= p.deadline, "Still voting");
        require(!p.executed, "Already executed");
        require(p.yesVotes > p.noVotes, "Proposal did not pass");
        p.executed = true;
        emit ProposalExecuted(_id);
    }
}`,
        challenge: 'Team A: Create real proposal "Should BlockCity have a park?" — 10-min duration on testnet. Team B: Vote YES with 2 different wallet addresses. Team A: Vote NO with 1 address. Watch timer. When expired, anyone calls executeProposal() live.',
        builderTask: 'Add uint256 public quorum = 3. In execute() add require(yesVotes + noVotes >= quorum, "Quorum not met"). Add setQuorum() onlyOwner.',
        architectTask: 'Token-weighted voting: import Room 2 token interface. Replace yesVotes++ with yesVotes += IERC20(tokenAddress).balanceOf(msg.sender).',
        tools: [
            { label: 'Remix IDE', url: 'https://remix.ethereum.org', icon: '🔧' },
        ],
    },
    room_5: {
        persona: '🔧 The City Engineer',
        warmup: 'A remote control for your TV. The remote = website. The TV = smart contract on the blockchain. The infrared signal = Ethers.js library. MetaMask = the battery. Without MetaMask, the remote does nothing. Today we build the remote — one HTML file.',
        entryPhrase: 'provider',
        entryWhy: 'The bridge between the browser and the blockchain',
        concepts: [
            { term: 'window.ethereum', explain: 'MetaMask injects this into every page. Check for it first. If absent → prompt install.' },
            { term: 'eth_requestAccounts', explain: 'Shows the MetaMask connection popup. User approves → you get their address.' },
            { term: 'ethers.BrowserProvider', explain: 'Wraps window.ethereum. Gives read access to blockchain.' },
            { term: 'provider.getSigner()', explain: 'Gets active wallet as a signer — can send transactions and sign messages.' },
            { term: 'new ethers.Contract()', explain: 'address + ABI + signer → a JS object. contract.functionName() calls the contract directly.' },
            { term: 'ABI from Remix', explain: 'Compile tab → ABI button → copy JSON. Paste into HTML. Links JS to the contract.' },
            { term: 'await tx.wait()', explain: 'After a write transaction, wait for confirmation. tx.hash = the explorer link.' },
        ],
        contract: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>BlockCity Hub</title>
  <script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>
</head>
<body>
  <h1>🏙️ BlockCity Hub</h1>
  <p>Wallet: <strong id="walletAddress">Not Connected</strong></p>
  <p>City Name: <strong id="cityName">--</strong></p>
  <button onclick="connectWallet()">Connect Wallet</button>
  <button onclick="readCityName()">Read City Name</button>
  <input id="newCityName" placeholder="New city name..."/>
  <button onclick="setCityName()">Update City Name</button>

<script>
const CONTRACT_ADDRESS = "0xYourAddressHere";
const ABI = [
  "function getCityName() view returns (string)",
  "function setCity(string memory _name) public",
];
let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) { alert("Install MetaMask!"); return; }
  await window.ethereum.request({method:"eth_requestAccounts"});
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  const addr = await signer.getAddress();
  document.getElementById("walletAddress").textContent =
    addr.slice(0,6)+"..."+addr.slice(-4);
}

async function readCityName() {
  const name = await contract.getCityName();
  document.getElementById("cityName").textContent = name;
}

async function setCityName() {
  const newName = document.getElementById("newCityName").value;
  const tx = await contract.setCity(newName);
  await tx.wait();
  await readCityName();
}
</script>
</body>
</html>`,
        challenge: 'Step 1: Open HTML in browser → Connect Wallet → MetaMask popup approves. Step 2: Wallet address displays — mentor checks it matches MetaMask. Step 3: Call one contract function and show result. Bonus: Submit write tx → show MetaMask confirmation → show on Etherscan.',
        builderTask: 'Add contract.on("LawAdded", callback). Every time anyone calls addLaw(), the UI updates automatically — real-time Web3 UI without page refresh.',
        architectTask: 'Full BlockCity Dashboard — four contract instances, four read functions on load, four UI sections, all auto-refreshing every 30s with setInterval().',
        tools: [
            { label: 'Remix IDE', url: 'https://remix.ethereum.org', icon: '🔧' },
            { label: 'Ethers.js Docs', url: 'https://docs.ethers.org', icon: '📚' },
        ],
    },
};

const TIER_OPTIONS = [
    { id: 'explorer', label: '🌱 Explorer', desc: '10 pts — core task complete', color: '#34d399' },
    { id: 'builder', label: '🟡 Builder', desc: '15 pts — extra task complete', color: '#F9A24D' },
    { id: 'architect', label: '🔴 Architect', desc: '20 pts — challenge complete', color: '#ef4444' },
];

const RoomDetail = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { ROOMS_META, roomProgress, completeRoom } = useParticipant();

    const room = ROOMS_META.find(r => r.id === roomId);
    const content = ROOM_CONTENT[roomId];
    const currentTier = roomProgress[roomId];

    const [tab, setTab] = useState('learn'); // 'learn' | 'code' | 'challenge'
    const [selectedTier, setSelectedTier] = useState(currentTier || null);
    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(!!currentTier);

    if (!room || !content) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <p className="text-gray-500">Room not found</p>
            </div>
        );
    }

    const copyCode = () => {
        navigator.clipboard.writeText(content.contract);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async () => {
        if (!selectedTier) return;
        setSubmitting(true);
        // In real app: await submitRoomStamp({ walletAddress, roomId, tier: selectedTier })
        setTimeout(() => {
            completeRoom(roomId, selectedTier);
            setSubmitted(true);
            setSubmitting(false);
        }, 800);
    };

    const TABS = [
        { id: 'learn', label: 'Learn', icon: BookOpen },
        { id: 'code', label: 'Contract', icon: Code2 },
        { id: 'challenge', label: 'Challenge', icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-primary pb-16">
            {/* Header */}
            <div
                className="relative px-4 pt-6 pb-8 border-b"
                style={{
                    background: `linear-gradient(135deg, rgba(10,10,26,0.95), ${room.color}10)`,
                    borderColor: `${room.color}20`,
                }}
            >
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => navigate('/participant/dashboard')}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm mb-4"
                    >
                        <ChevronLeft size={16} />
                        Back to Dashboard
                    </button>

                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{room.icon}</span>
                                <span
                                    className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                                    style={{ color: room.color, border: `1px solid ${room.color}30`, background: `${room.color}10` }}
                                >
                                    Room {room.number}
                                </span>
                                {submitted && (
                                    <CheckCircle size={16} style={{ color: room.color }} />
                                )}
                            </div>
                            <h1 className="text-3xl font-heading font-bold text-white">{room.name}</h1>
                            <p className="text-sm mt-1" style={{ color: `${room.color}aa` }}>{content.persona}</p>
                        </div>

                        {/* Entry phrase */}
                        <div
                            className="rounded-xl px-4 py-3 text-center"
                            style={{
                                background: `${room.color}10`,
                                border: `1px solid ${room.color}30`,
                            }}
                        >
                            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Entry Phrase</p>
                            <p className="font-heading font-bold" style={{ color: room.color }}>"{content.entryPhrase}"</p>
                            <p className="text-[9px] text-gray-600 mt-1 max-w-[140px]">{content.entryWhy}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-6">
                {/* Warmup analogy */}
                <div
                    className="rounded-xl px-5 py-4 mb-6 border-l-4"
                    style={{
                        background: `${room.color}06`,
                        borderLeftColor: room.color,
                        border: `1px solid ${room.color}20`,
                        borderLeft: `4px solid ${room.color}`,
                    }}
                >
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">🌱 Zero Assumption Warmup</p>
                    <p className="text-gray-300 text-sm leading-relaxed italic">"{content.warmup}"</p>
                </div>

                {/* Tabs */}
                <div
                    className="flex gap-1 p-1 rounded-xl mb-6"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                            style={{
                                background: tab === id ? `${room.color}15` : 'transparent',
                                color: tab === id ? room.color : '#6b7280',
                                border: tab === id ? `1px solid ${room.color}30` : '1px solid transparent',
                            }}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tab: Learn */}
                {tab === 'learn' && (
                    <div className="space-y-2">
                        {content.concepts.map((c, i) => (
                            <div
                                key={i}
                                className="rounded-xl border px-4 py-3"
                                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
                            >
                                <p
                                    className="text-sm font-heading font-bold mb-1 font-mono"
                                    style={{ color: room.color }}
                                >
                                    {c.term}
                                </p>
                                <p className="text-gray-400 text-xs leading-relaxed">{c.explain}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab: Code */}
                {tab === 'code' && (
                    <div
                        className="rounded-xl border overflow-hidden"
                        style={{ borderColor: `${room.color}20` }}
                    >
                        <div
                            className="flex items-center justify-between px-4 py-3 border-b"
                            style={{ background: `${room.color}08`, borderColor: `${room.color}20` }}
                        >
                            <div className="flex items-center gap-2">
                                <Code2 size={14} style={{ color: room.color }} />
                                <span className="text-xs font-bold text-white">Contract Code</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyCode}
                                    className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all"
                                    style={{
                                        background: copied ? 'rgba(52,211,153,0.1)' : `${room.color}10`,
                                        border: `1px solid ${copied ? '#34d39940' : room.color + '30'}`,
                                        color: copied ? '#34d399' : room.color,
                                    }}
                                >
                                    <Copy size={10} />
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <a
                                    href="https://remix.ethereum.org"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    <ExternalLink size={10} />
                                    Remix
                                </a>
                            </div>
                        </div>
                        <div
                            className="p-4 overflow-auto max-h-[500px] font-mono text-xs leading-relaxed"
                            style={{ background: 'rgba(0,0,0,0.4)', color: '#e2e8f0' }}
                        >
                            <pre style={{ margin: 0, whiteSpace: 'pre', color: '#e2e8f0' }}>{content.contract}</pre>
                        </div>
                    </div>
                )}

                {/* Tab: Challenge */}
                {tab === 'challenge' && (
                    <div className="space-y-4">
                        {/* Main challenge */}
                        <div
                            className="rounded-xl border p-4"
                            style={{ background: `${room.color}06`, borderColor: `${room.color}25` }}
                        >
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">⚡ Challenge</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{content.challenge}</p>
                        </div>

                        {/* Tier tasks */}
                        <div
                            className="rounded-xl border p-4"
                            style={{ background: 'rgba(249,162,77,0.04)', borderColor: 'rgba(249,162,77,0.15)' }}
                        >
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">🟡 Builder Extra Task</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{content.builderTask}</p>
                        </div>

                        <div
                            className="rounded-xl border p-4"
                            style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.15)' }}
                        >
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">🔴 Architect Challenge</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{content.architectTask}</p>
                        </div>

                        {/* Tier selection + stamp */}
                        <div
                            className="rounded-xl border p-5"
                            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
                        >
                            <p className="text-sm font-heading font-bold text-white mb-4">
                                {submitted ? '✅ Room Completed' : 'Request Stamp from Mentor'}
                            </p>

                            {!submitted ? (
                                <>
                                    <div className="space-y-2 mb-4">
                                        {TIER_OPTIONS.map((tier) => (
                                            <button
                                                key={tier.id}
                                                onClick={() => setSelectedTier(tier.id)}
                                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left"
                                                style={{
                                                    background: selectedTier === tier.id ? `${tier.color}12` : 'transparent',
                                                    borderColor: selectedTier === tier.id ? `${tier.color}50` : 'rgba(255,255,255,0.08)',
                                                }}
                                            >
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: selectedTier === tier.id ? tier.color : '#9ca3af' }}>
                                                        {tier.label}
                                                    </p>
                                                    <p className="text-[10px] text-gray-600">{tier.desc}</p>
                                                </div>
                                                {selectedTier === tier.id && (
                                                    <CheckCircle size={16} style={{ color: tier.color }} />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={!selectedTier || submitting}
                                        className="w-full py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-30"
                                        style={{
                                            background: selectedTier ? `linear-gradient(135deg, ${room.color}, ${room.color}99)` : 'rgba(255,255,255,0.05)',
                                            color: selectedTier ? '#0a0a1a' : '#4b5563',
                                            boxShadow: selectedTier ? `0 0 20px ${room.color}30` : 'none',
                                        }}
                                    >
                                        {submitting ? 'Submitting...' : '🏷️ Claim Stamp'}
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="text-4xl mb-2">🏆</div>
                                    <p className="text-white font-medium mb-1">
                                        Stamp claimed at <span style={{ color: room.color }}>{currentTier}</span> tier
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        +{currentTier === 'explorer' ? 10 : currentTier === 'builder' ? 15 : 20} pts added to your score
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tools */}
                        <div className="flex gap-2 flex-wrap">
                            {content.tools.map((tool) => (
                                <a
                                    key={tool.label}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
                                >
                                    <span>{tool.icon}</span>
                                    {tool.label}
                                    <ExternalLink size={9} />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomDetail;