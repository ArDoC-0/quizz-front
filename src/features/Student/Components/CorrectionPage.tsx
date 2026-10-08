import { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, Decoration } from '@codemirror/view';
import { StateField } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';
import { card, heading, STATUS } from '../../../shared/constants/constants';
import Question from './Question';


/* ---------- Données d'exemple (à remplacer par votre API) ---------- */
const quiz = {
  title: 'Correction : Bases du développement web',
  meta: 'Rendu le 28 septembre 2026 · corrigé par M. Rakoto',
  questions: [
    {
      id: 1, type: 'qcm', multiple: false, language: 'php', max: 2, earned: 2,
      subject: 'Que affiche ce script ?',
      code: { filename: 'index.php', value: '<?php\n$a = "5";\n$b = 5;\nvar_dump($a === $b);' },
      options: [
        { id: 'a', text: '`bool(true)`', correct: false, chosen: false },
        { id: 'b', text: '`bool(false)`', correct: true, chosen: true },
        { id: 'c', text: '`int(5)`', correct: false, chosen: false },
      ],
      explanation: '`===` compare la valeur et le type. Une chaîne et un entier ne sont pas du même type : le résultat est `false`.',
    },
    {
      id: 2, type: 'qcm', multiple: true, language: 'js', max: 3, earned: 0,
      subject: 'Quelles lignes modifient le tableau d’origine ?',
      code: { filename: 'tableau.js', value: 'const nombres = [3, 1, 2];' },
      options: [
        { id: 'a', text: '`nombres.map(n => n * 2)`', correct: false, chosen: true },
        { id: 'b', text: '`nombres.sort()`', correct: true, chosen: false },
        { id: 'c', text: '`nombres.push(4)`', correct: true, chosen: true },
        { id: 'd', text: '`nombres.slice(1)`', correct: false, chosen: false },
      ],
      explanation: '`sort` et `push` modifient le tableau sur place. `map` et `slice` renvoient un nouveau tableau. Une mauvaise case cochée annule les points.',
    },
    {
      id: 3, type: 'code', language: 'js', max: 8, earned: 5,
      subject: 'Écrivez la fonction `sommePairs(tableau)` qui renvoie la somme des nombres pairs. Elle doit renvoyer `0` pour un tableau vide.',
      files: [{ name: 'enonce.pdf', size: '120 Ko', href: '#' }, { name: 'tests.js', size: '1 Ko', href: '#' }],
      student: {
        filename: 'reponse.js',
        value: 'function sommePairs(t) {\n  let somme = 0;\n  for (let i = 0; i <= t.length; i++) {\n    if (t[i] % 2 == 0) somme += t[i];\n  }\n  return somme;\n}',
        badLines: [4],
      },
      solution: {
        filename: 'solution.js',
        value: 'function sommePairs(t) {\n  return t\n    .filter(n => n % 2 === 0)\n    .reduce((a, n) => a + n, 0);\n}',
        goodLines: [3, 4],
      },
      tests: [
        { label: '`sommePairs([1, 2, 3, 4])` renvoie 6', pass: true },
        { label: '`sommePairs([])` renvoie 0', pass: true },
        { label: '`sommePairs([-2, 5])` renvoie -2', pass: true },
        { label: '`sommePairs([2, 4])`', pass: false, detail: 'Attendu 6, reçu NaN' },
        { label: '`sommePairs([10])`', pass: false, detail: 'Attendu 10, reçu NaN' },
      ],
      feedback: 'La logique est bonne, mais `i <= t.length` lit une case hors du tableau, d’où le `NaN`. Utilisez `i < t.length` et préférez `===` à `==`.',
      criteria: [
        { label: 'Logique', earned: 3, max: 3 },
        { label: 'Résultats des tests', earned: 1.5, max: 3 },
        { label: 'Qualité du code', earned: 0.5, max: 2 },
      ],
    },
    {
      id: 4, type: 'code', language: 'php', max: 7, earned: 6,
      subject: 'Écrivez une fonction `estPalindrome($mot)` qui indique si un mot se lit de la même façon dans les deux sens, sans tenir compte de la casse.',
      files: [],
      student: {
        filename: 'reponse.php',
        value: 'function estPalindrome($mot) {\n  $m = strtolower($mot);\n  return $m == strrev($m);\n}',
        badLines: [3],
      },
      solution: {
        filename: 'solution.php',
        value: 'function estPalindrome(string $mot): bool {\n  $m = mb_strtolower($mot);\n  return $m === strrev($m);\n}',
        goodLines: [3],
      },
      tests: [
        { label: '`estPalindrome("Kayak")` renvoie true', pass: true },
        { label: '`estPalindrome("php")` renvoie false', pass: true },
        { label: '`estPalindrome("")` renvoie true', pass: true },
        { label: '`estPalindrome("Ab")` renvoie false', pass: true },
      ],
      feedback: 'Tous les tests passent. Préférez `===` à `==` en PHP et ajoutez les types de paramètre et de retour.',
      criteria: [],
    },
  ],
};


export const statusOf = (q) => {
  const r = q.earned / q.max;
  return r >= 0.75 ? 'ok' : r < 0.25 ? 'ko' : 'part';
};
export const fmt = (n) => String(n).replace('.', ',');


/** Surligne des lignes (numérotées à partir de 1) dans CodeMirror avec des classes Tailwind. */
const LINE_BAD = 'bg-red-400/20 shadow-[inset_3px_0_0_#ff8b7d]';
const LINE_GOOD = 'bg-emerald-400/15 shadow-[inset_3px_0_0_#4cd39b]';


/* ---------- Page ---------- */
function CorrectionPage() {
  const [filter, setFilter] = useState('all');
  const { questions } = quiz;

  const earned = questions.reduce((sum, q) => sum + q.earned, 0);
  const max = questions.reduce((sum, q) => sum + q.max, 0);
  const count = (s) => questions.filter((q) => statusOf(q) === s).length;
  const visible = questions.filter((q) => filter === 'all' || statusOf(q) !== 'ok');
  const pct = (earned / max) * 100;

  return (
    <div className="min-h-screen bg-slate-50 rounded-2xl font-['Figtree',system-ui,sans-serif] text-[#16213a] dark:bg-[#0e1424] dark:text-slate-100">
      <div className="mx-auto max-w-6xl gap-7 px-5 pb-16 pt-6 md:grid-cols-[200px_minmax(0,1fr)]">
        {/* En-tête */}
        <header className={`${card} grid items-center gap-5 p-6 sm:grid-cols-[1fr_auto] mb-1 md:col-span-2`}>
          <div>
            <h1 className={`${heading} text-[clamp(1.6rem,4vw,2.3rem)]`}>{quiz.title}</h1>
            <p className="mb-0 mt-1.5 text-slate-500 dark:text-slate-400">{quiz.meta}</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              role="img"
              aria-label={`Note ${fmt(earned)} sur ${max}`}
              className="grid size-[92px] place-items-center rounded-full"
              style={{ background: `conic-gradient(#0f7b52 0 ${pct}%, #fbe7e4 0)` }}
            >
              <b className={`${heading} grid size-[68px] place-items-center rounded-full bg-white text-[1.35rem] dark:bg-[#161e33]`}>
                {fmt(earned)}
              </b>
            </div>
            <div className="grid gap-1 text-[.9rem]">
              {[['ok', 'réussies'], ['part', 'partielles'], ['ko', 'ratées']].map(([k, l]) => (
                <span key={k} className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-sm ${STATUS[k].dot}`} />
                  {count(k)} {l}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Navigation */}


        {/* Questions */}
        <main className="grid min-w-0 w-full content-start gap-5">
          {visible.map((q) => <Question key={q.id} q={q} />)}
        </main>
      </div>
    </div>
  );
}
export default  CorrectionPage