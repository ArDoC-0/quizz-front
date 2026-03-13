import { useState } from "react";
import './UserCreationMessage.scss'
export default function UserCreatedPopupContent({ identifier }: {identifier: string}) {

  const [copied, setCopied] = useState(false);

  const copyIdentifier = async () => {
    await navigator.clipboard.writeText(identifier);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="user-created-popup">

      <div className="icon-success">✓</div>

      <h2 className="title">
        Utilisateur créé avec succès
      </h2>

      <p className="description">
        L'utilisateur a bien été créé dans le système.
      </p>

      <div className="identifier-box">

        <div className="identifier-text">
          <span>Identifiant :</span>
          <strong>{identifier}</strong>
        </div>

        <button
          type="button"
          className="copy-button"
          onClick={copyIdentifier}
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>

      </div>

      <p className="info">
        Conservez cet identifiant pour la connexion.
      </p>

    </div>
  );
}