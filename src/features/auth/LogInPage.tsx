import { useState } from "react";
import "./LoginPage.scss"
import { useAppDispatch } from "../../shared/hooks/hooks";
import { authServices } from "./services/authService";
import { setUser } from "./authSlice";

function LoginPage() {

  // États pour les champs du formulaire
  const [credentials, setCredentials] = useState({ identifiant: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  // Gestion des changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Appel au service (CSRF + Login via attemptAuth)
      const user = (await authServices.login(credentials)).data;

      console.log(user)
      dispatch(setUser(user));

      // 3. Direction le Dashboard !
    } catch (err: any) {
      // Gestion fine de l'erreur
      if (err.response?.status === 401) {
        setErrorMessage("Identifiant ou mot de passe incorrect.");
      } else if (err.response?.status === 422) {
        setErrorMessage("Données de connexion non valides.");
      } else {
        setErrorMessage("Une erreur réseau est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login-container w-[50%] m-auto shadow-2xl rounded-2xl">
      <div className="login-card py-4 rounded-2xl">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Bienvenue</h1>
          <p className="text-slate-400 mt-2">Connexion</p>
        </div>
        {/* erreur */}
        {errorMessage && (
          <div className="error-alert animate-shake">
            {errorMessage}
          </div>
        )}

        <form className="p-8 flex justify-center items-center flex-col" onSubmit={(e) => handleLogin(e)}>
          <div className="input-group">
            <label htmlFor="email">Identifiant :</label>
            <input
              type="text"
              id="identifiant"
              placeholder="nom@ecole"
              value={credentials.identifiant}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">

            <label htmlFor="password" title="Mot de passe" className="mb-0">Mot de passe :</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <a href="#" className="text-xs block ms-auto mb-4 text-blue-400 hover:underline">Mot de passe oublié ?</a>

          <button
            type="submit"
            disabled={loading} // Empêche le double clic pendant l'appel API
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Connexion...</span>
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="mt-0 text-center">
          <p className="text-sm text-slate-500">
            Besoin d'un compte ? <a href="#" className="text-blue-400 hover:underline font-medium">Contactez l'administrateur</a>
          </p>
        </div>
      </div>
    </div>
  );

}

export default LoginPage