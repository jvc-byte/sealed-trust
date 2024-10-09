import React, { useState } from 'react';

const AgreementTextarea = () => {
  const [agreement, setAgreement] = useState('');
  const wordLimit = 2000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/); // Split by whitespace to get words

    if (words.length <= wordLimit) {
      setAgreement(value);
    } else {
      alert(`Word limit of ${wordLimit} exceeded!`);
    }
  };

  return (
    <div>
      <textarea
        className="textarea w-full mb-2 textarea-bordered"
        placeholder="Describe The Agreement"
        name="description"
        value={agreement}
        onChange={handleChange}
      />
      <div className="text-right text-sm text-gray-600">
        {agreement.trim().split(/\s+/).length} / {wordLimit} words
      </div>
    </div>
  );
};

export default AgreementTextarea;