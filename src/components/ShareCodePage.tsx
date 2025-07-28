import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { contactService } from '../services/contactService';
import { Contact } from '../types';

const ShareCodePage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState<Contact | null>(null);
  const [expiresAt, setExpiresAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await contactService.getSharedContact(code.trim());
      setContact(response.contact);
      setExpiresAt(response.expiresAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Code invalide');
    } finally {
      setLoading(false);
    }
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            🚩🏴 Contacts CNT-AIT
          </h1>
          <p className="text-white">Accéder avec un code de partage</p>
        </div>

        {!contact ? (
          <div className="bg-red-600 rounded-lg p-6 border-2 border-white mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez le code de partage..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-black text-black font-mono text-center"
                  disabled={loading}
                />
              </div>
              
              {error && (
                <div className="bg-black text-white p-3 rounded-lg border border-white text-center">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full flex items-center justify-center py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {loading ? (
                  'Recherche...'
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Accéder au contact
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-red-600 rounded-lg p-6 border-2 border-white mb-6">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Contact Partagé
            </h2>
            
            <div className="bg-white rounded-lg p-4 border-2 border-black">
              <h3 className="text-xl font-bold text-black mb-3">
                {contact.firstName} {contact.lastName}
              </h3>
              
              <div className="space-y-2 text-black">
                {contact.phone && (
                  <div>📞 {contact.phone}</div>
                )}
                {contact.email && (
                  <div>📧 {contact.email}</div>
                )}
                {contact.note && (
                  <div>📝 {contact.note}</div>
                )}
              </div>
            </div>
            
            <div className="text-white text-sm text-center mt-4">
              ⏰ Expire le {formatExpiryDate(expiresAt)}
            </div>
            
            <button
              onClick={() => {
                setContact(null);
                setCode('');
                setError('');
              }}
              className="w-full mt-4 py-2 bg-black text-white border-2 border-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              Nouveau code
            </button>
          </div>
        )}
        
        <div className="text-center">
          <a 
            href="/"
            className="inline-flex items-center bg-white text-black px-6 py-2 rounded-lg border-2 border-red-600 hover:bg-gray-100 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'application
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareCodePage;