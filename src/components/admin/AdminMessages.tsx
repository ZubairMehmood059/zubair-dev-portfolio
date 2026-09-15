import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Trash2,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Search,
  Inbox,
  User,
  ExternalLink,
} from 'lucide-react';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const { messages, markMessageRead, deleteMessage, showToast } = usePortfolio();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    messages.length > 0 ? messages[0] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'starred'>('all');

  const filtered = messages.filter((m) => {
    if (filterType === 'unread' && m.isRead) return false;
    if (filterType === 'starred' && !m.isStarred) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageRead(msg.id, true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this message from inbox?')) {
      deleteMessage(id);
      showToast('Message deleted.');
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Direct Inquiry Inbox</h2>
          <p className="text-xs text-slate-400">
            Messages transmitted by visitors and recruiters via the contact form on Zubair.dev.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 w-44"
            />
          </div>

          <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded ${filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('unread')}
              className={`px-2.5 py-1 rounded ${filterType === 'unread' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Unread
            </button>
          </div>
        </div>
      </div>

      {/* Split layout: Messages list (Left) + Message preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((msg) => {
            const isSelected = selectedMessage?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md'
                    : !msg.isRead
                    ? 'bg-slate-900 border-cyan-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    )}
                    <span className="font-bold text-white line-clamp-1">{msg.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-cyan-300 font-medium mt-1 truncate">{msg.subject}</div>
                <p className="text-slate-400 line-clamp-2 mt-1 leading-relaxed">{msg.message}</p>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
              <Inbox className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              No messages found.
            </div>
          )}
        </div>

        {/* Right Reader (7 cols) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="font-semibold text-slate-200">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 min-h-[160px]">
                {selectedMessage.message}
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <button
                  onClick={() => markMessageRead(selectedMessage.id, !selectedMessage.isRead)}
                  className="hover:text-cyan-300"
                >
                  Mark as {selectedMessage.isRead ? 'Unread' : 'Read'}
                </button>

                <span className="font-mono text-[11px] text-slate-500">ID: {selectedMessage.id}</span>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 text-slate-400 text-xs">
              Select a message from the list to view transmission details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
