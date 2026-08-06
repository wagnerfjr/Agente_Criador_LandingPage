import { useState } from 'react';
import { Button, Card } from '@/components';
import { logger } from '@/utils/logger';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'weight-loss',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Track form submission
      logger.event('FormSubmitted', {
        formType: 'LeadCapture',
        goal: formData.goal,
      });

      // Send to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();

      setStatus('success');
      setMessage('✅ Sucesso! Verifique seu email para próximos passos.');
      setFormData({ name: '', email: '', phone: '', goal: 'weight-loss' });

      // Log success
      logger.info('Lead captured successfully', {
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

      // Track conversion with Meta Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          email: formData.email,
          phone: formData.phone,
        });
      }

      // Clear success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Erro: ${error.message}`);

      logger.error('Form submission failed', {
        error: error.message,
        formData: { ...formData, email: formData.email.substring(0, 3) + '***' }, // Hide email
      });

      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <Card variant="elevated" padding="lg" className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold font-heading text-dark mb-6">
        Comece Sua Transformação
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
            placeholder="Seu nome"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
            placeholder="seu@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
            WhatsApp (Opcional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
            placeholder="(11) 99999-9999"
          />
        </div>

        {/* Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-semibold text-dark mb-2">
            Seu Objetivo
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
          >
            <option value="weight-loss">Perder Peso</option>
            <option value="muscle-gain">Ganhar Massa Muscular</option>
            <option value="fitness">Melhorar Condicionamento</option>
            <option value="transformation">Transformação Completa</option>
          </select>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-semibold ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '⏳ Enviando...' : '✨ Quero Começar'}
        </Button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          Seus dados estão seguros. Não compartilhamos com terceiros.
        </p>
      </form>
    </Card>
  );
}
