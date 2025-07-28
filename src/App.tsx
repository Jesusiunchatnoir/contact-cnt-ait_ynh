import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User, UserPlus, LogOut, Search, Plus, Edit3, Trash2, Share2, Download, Upload, Eye, EyeOff } from 'lucide-react';
import AuthForm from './components/AuthForm';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ShareModal from './components/ShareModal';
import SharedContact from './components/SharedContact';
import ShareCodeInput from './components/ShareCodeInput';

import { Contact, User as UserType } from './types';
import { authService } from './services/authService';
import { contactService } from './services/contactService';

function MainApp() {
  const [user, setUser] = useState<UserType | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingContact, setSharingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharedContact, setSharedContact] = useState<{contact: Contact, expiresAt: string} | null>(null);


  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      loadContacts();
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification d\'authentification:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const contactsData = await contactService.getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  };

  const handleLogin = async (userData: UserType, token: string) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setContacts([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleContactSubmit = async (contactData: Omit<Contact, 'id'>) => {
    try {
      if (editingContact) {
        await contactService.updateContact(editingContact.id, contactData);
      } else {
        await contactService.createContact(contactData);
      }
      
      await loadContacts();
      setShowContactForm(false);
      setEditingContact(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du contact:', error);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        await contactService.deleteContact(id);
        await loadContacts();
      } catch (error) {
        console.error('Erreur lors de la suppression du contact:', error);
      }
    }
  };

  const handleShareContact = (contact: Contact) => {
    setSharingContact(contact);
    setShowShareModal(true);
  };

  const handleExportContacts = async () => {
    try {
      const blob = await contactService.exportContacts();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  const handleImportContacts = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const contacts = JSON.parse(text);
      await contactService.importContacts(contacts);
      await loadContacts();
      alert('Contacts importés avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      alert('Erreur lors de l\'import des contacts');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto pt-4 sm:pt-8 px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
              🚩🏴 Contacts CNT-AIT
            </h1>
          </div>
          
          <ShareCodeInput 
            onContactFound={(contact, expiresAt) => setSharedContact({contact, expiresAt})}
          />
          
          {sharedContact ? (
            <div className="bg-red-600 rounded-lg p-4 sm:p-6 border-2 border-white mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
                Contact Partagé
              </h2>
              
              <div className="bg-white rounded-lg p-4 border-2 border-black">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">
                  {sharedContact.contact.firstName} {sharedContact.contact.lastName}
                </h3>
                
                <div className="space-y-2 text-black text-sm sm:text-base">
                  {sharedContact.contact.phone && (
                    <div>📞 {sharedContact.contact.phone}</div>
                  )}
                  {sharedContact.contact.email && (
                    <div>📧 {sharedContact.contact.email}</div>
                  )}
                  {sharedContact.contact.note && (
                    <div>📝 {sharedContact.contact.note}</div>
                  )}
                </div>
              </div>
              
              <div className="text-white text-sm text-center mt-4">
                ⏰ Expire le {new Date(sharedContact.expiresAt).toLocaleString('fr-FR')}
              </div>
              
              <button
                onClick={() => setSharedContact(null)}
                className="w-full mt-4 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-gray-900 transition-colors font-medium touch-manipulation"
              >
                Fermer
              </button>
            </div>
          ) : null}
          
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-red-600 shadow-lg border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0">
              <img 
                src="https://cnt33.fr/wp-content/uploads/2022/10/arton238-930x620.png" 
                alt="CNT-AIT Logo" 
                className="h-8 sm:h-10 w-auto mr-2 sm:mr-3 flex-shrink-0"
              />
              <h1 className="text-sm sm:text-xl font-bold text-white truncate">Contacts Sécurisés</h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-4">
              <span className="hidden sm:block text-sm text-white font-medium">Bienvenue, {user.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-red-200 transition-colors font-medium text-sm p-2 sm:p-0"
              >
                <LogOut className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Barre d'outils */}
        <div className="mb-4 sm:mb-8 space-y-4">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-black border-2 border-red-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-600 text-base"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:flex gap-2">
            <button
              onClick={() => setShowContactForm(true)}
              className="flex items-center justify-center px-3 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Nouveau Contact</span>
              <span className="sm:hidden">Nouveau</span>
            </button>
            
            <button
              onClick={handleExportContacts}
              className="flex items-center justify-center px-3 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Exporter</span>
            </button>
            
            <label className="flex items-center justify-center px-3 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-gray-900 transition-colors cursor-pointer text-sm font-medium col-span-2 sm:col-span-1">
              <Upload className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Importer</span>
              <span className="sm:hidden">Importer fichier</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportContacts}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Liste des contacts */}
        <ContactList
          contacts={filteredContacts}
          onEdit={(contact) => {
            setEditingContact(contact);
            setShowContactForm(true);
          }}
          onDelete={handleDeleteContact}
          onShare={handleShareContact}
        />

        {/* Formulaire de contact */}
        {showContactForm && (
          <ContactForm
            contact={editingContact}
            onSubmit={handleContactSubmit}
            onCancel={() => {
              setShowContactForm(false);
              setEditingContact(null);
            }}
          />
        )}

        {/* Modal de partage */}
        {showShareModal && sharingContact && (
          <ShareModal
            contact={sharingContact}
            onClose={() => {
              setShowShareModal(false);
              setSharingContact(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/share/:shareCode" element={<SharedContact />} />
        <Route path="/code/:shareCode" element={<SharedContact />} />

        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;