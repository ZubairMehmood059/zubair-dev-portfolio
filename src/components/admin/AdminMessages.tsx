import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Trash2,
  Clock,
  Send,
  Search,
  Inbox,
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
    <div className="space-y-6 font-['Kanit',sans-serif] text-[#D7E2EA]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight hero-heading">
            Direct Inquiry Inbox
          </h2>
          <p className="text-xs sm:text-sm text-[#BBCCD7]/70 font-light mt-1">
            Messages transmitted by visitors and recruiters via the contact form on Zubair.dev.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#BBCCD7]/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-full bg-[#121212] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D7E2EA] w-48 sm:w-60"
            />
          </div>

          <div className="flex rounded-full bg-[#121212] border border-white/10 p-0.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-mono cursor-pointer transition-colors ${
                filterType === 'all' ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold' : 'text-[#BBCCD7]/70 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('unread')}
              className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-mono cursor-pointer transition-colors ${
                filterType === 'unread' ? 'bg-[#D7E2EA] text-[#0C0C0C] font-bold' : 'text-[#BBCCD7]/70 hover:text-white'
              }`}
            >
              Unread
            </button>
          </div>
        </div>
      </div>

      {/* Split layout: Messages list (Left) + Message preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((msg) => {
            const isSelected = selectedMessage?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-[20px] border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#18181B] border-[#D7E2EA] shadow-md'
                    : !msg.isRead
                    ? 'bg-[#141414] border-[#D7E2EA]/40'
                    : 'bg-[#121212] border-white/10 hover:bg-[#18181B] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                    )}
                    <span className="font-bold text-white uppercase line-clamp-1">{msg.name}</span>
                  </div>
                  <span className="text-[10px] text-[#BBCCD7]/50 font-mono shrink-0">
                    {msg.createdAt || 'Recent'}
                  </span>
                </div>

                <div className="text-[#D7E2EA] font-medium mt-1 truncate">{msg.subject}</div>
                <p className="text-[#BBCCD7]/60 line-clamp-2 mt-1 leading-relaxed font-light">{msg.message}</p>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center bg-[#121212] rounded-[24px] border border-white/10 text-[#BBCCD7]/60 text-xs">
              <Inbox className="w-8 h-8 mx-auto text-[#BBCCD7]/40 mb-2" />
              No messages found.
            </div>
          )}
        </div>

        {/* Right Reader (7 cols) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 rounded-[28px] bg-[#121212] border border-white/10 space-y-6">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#BBCCD7]/70 mt-1">
                    <span className="font-semibold text-white uppercase">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-[11px] text-[#BBCCD7]/50 font-mono mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D7E2EA]" />
                    <span>{selectedMessage.createdAt || 'Direct Contact Form'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-wider shadow transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-rose-400 hover:border-rose-500/40 cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="text-xs sm:text-sm text-[#D7E2EA] leading-relaxed whitespace-pre-wrap font-sans bg-black/50 p-5 rounded-[20px] border border-white/10 min-h-[160px] font-light">
                {selectedMessage.message}
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between text-xs text-[#BBCCD7]/60 pt-2 font-mono">
                <button
                  onClick={() => markMessageRead(selectedMessage.id, !selectedMessage.isRead)}
                  className="hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Mark as {selectedMessage.isRead ? 'Unread' : 'Read'}
                </button>

                <span className="text-[11px]">ID: {selectedMessage.id}</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-[28px] bg-[#121212] border border-white/10 text-[#BBCCD7]/60 text-xs">
              Select a message from the list to view transmission details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
