import "./LoginPage.scss"

function LoginPage() {

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

        <form className="p-8 flex justify-center items-center flex-col" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label htmlFor="email">Identifiant :</label>
            <input
              type="email"
              id="email"
              placeholder="nom@ecole.fr"
            />
          </div>

          <div className="input-group">
            
              <label htmlFor="password" title="Mot de passe" className="mb-0">Mot de passe :</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
              />
          </div>
            <a href="#" className="text-xs block ms-auto mb-4 text-blue-400 hover:underline">Mot de passe oublié ?</a>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-blue-600/20"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Besoin d'un compte ? <a href="#" className="text-blue-400 hover:underline font-medium">Contactez l'administrateur</a>
          </p>
        </div>
      </div>
    </div>
  );

}

export default LoginPage