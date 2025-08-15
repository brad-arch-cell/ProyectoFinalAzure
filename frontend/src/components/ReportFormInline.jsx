import React, { useState } from 'react';

function ReportFormInline({ placeId }) {
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description,
            place_id: placeId,
            date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
          }),
        });
  
        if (!res.ok) throw new Error('Error al enviar reporte');
  
        setSubmitted(true);
        setDescription('');
      } catch (err) {
        setError('No se pudo enviar el reporte.');
      }
    };
  
    if (submitted) return <p className="text-success">Reporte enviado ✅</p>;
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control form-control-sm"
          rows="2"
          placeholder="Describa el problema..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-sm btn-primary mt-1">Enviar</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    );
  }
  
  export default ReportFormInline;