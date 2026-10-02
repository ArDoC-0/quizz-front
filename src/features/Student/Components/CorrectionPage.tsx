import { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, Decoration } from '@codemirror/view';
import { StateField } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';

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

/* ---------- Styles par statut (classes écrites en entier pour que Tailwind les détecte) ---------- */
const STATUS = {
  ok: {
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-700 dark:border-emerald-400',
    borderL: 'border-l-emerald-700 dark:border-l-emerald-400',
    dot: 'bg-emerald-700 dark:bg-emerald-400',
  },
  part: {
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-700 dark:border-amber-300',
    borderL: 'border-l-amber-700 dark:border-l-amber-300',
    dot: 'bg-amber-600 dark:bg-amber-300',
  },
  ko: {
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-700 dark:border-red-400',
    borderL: 'border-l-red-700 dark:border-l-red-400',
    dot: 'bg-red-700 dark:bg-red-400',
  },
};

const card = 'rounded-2xl border border-slate-200 bg-white dark:border-[#28324d] dark:bg-[#161e33]';
const panel = 'rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 dark:border-[#28324d] dark:bg-[#0e1424]';
const heading = "font-['Bricolage_Grotesque',sans-serif] leading-tight";
const mono = "font-['JetBrains_Mono',monospace]";
const focus = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-300';

const LANGS = { js: javascript, php, html };
const LANG_NAMES = { js: 'JavaScript', php: 'PHP', html: 'HTML'};

const statusOf = (q) => {
  const r = q.earned / q.max;
  return r >= 0.75 ? 'ok' : r < 0.25 ? 'ko' : 'part';
};
const fmt = (n) => String(n).replace('.', ',');

/** Rend le texte avec `code` en balise <code>. */
function Inline({ text }) {
  return text.split('`').map((part, i) =>
    i % 2 ? <code key={i} className={`${mono} text-[.88em]`}>{part}</code> : part
  );
}

/** Surligne des lignes (numérotées à partir de 1) dans CodeMirror avec des classes Tailwind. */
const LINE_BAD = 'bg-red-400/20 shadow-[inset_3px_0_0_#ff8b7d]';
const LINE_GOOD = 'bg-emerald-400/15 shadow-[inset_3px_0_0_#4cd39b]';

const highlightLines = (lines, className) => {
  const deco = Decoration.line({ class: className });
  return StateField.define({
    create(state) {
      const ranges = lines
        .filter((n) => n <= state.doc.lines)
        .map((n) => deco.range(state.doc.line(n).from));
      return Decoration.set(ranges, true);
    },
    update: (value) => value,
    provide: (f) => EditorView.decorations.from(f),
  });
};

/* ---------- Composants ---------- */
function CodeBlock({ language, filename, value, badLines = [], goodLines = [] }) {
  const extensions = useMemo(() => {
    const ext = [LANGS[language](), EditorView.lineWrapping];
    if (badLines.length) ext.push(highlightLines(badLines, LINE_BAD));
    if (goodLines.length) ext.push(highlightLines(goodLines, LINE_GOOD));
    return ext;
  }, [language, badLines, goodLines]);

  return (
    <div className="min-w-0 overflow-hidden rounded-xl bg-[#282c34]">
      <div className={`${mono} flex justify-between border-b border-[#263050] px-3.5 py-1.5 text-xs font-medium text-[#8fa0cc]`}>
        <span>{LANG_NAMES[language]}</span>
        <span>{filename}</span>
      </div>
      <CodeMirror
        value={value}
        theme={oneDark}
        extensions={extensions}
        // readOnly
        editable={true}
        className={`text-sm [&_.cm-content]:${mono}`}
        basicSetup={{ foldGutter: false, highlightActiveLine: false }}
      />
    </div>
  );
}

function Files({ files }) {
  if (!files?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((f) => (
        <a
          key={f.name}
          href={f.href}
          download
          className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm no-underline dark:border-[#28324d] dark:bg-[#0e1424] ${focus}`}
        >
          📎 {f.name} <span className="text-xs text-slate-500 dark:text-slate-400">{f.size}</span>
        </a>
      ))}
    </div>
  );
}

function Options({ question }) {
  const label = (o) => {
    if (o.chosen && o.correct) return 'Correcte';
    if (o.chosen && !o.correct) return 'Cochée à tort';
    if (o.correct) return question.multiple ? 'Oubliée' : 'Bonne réponse';
    return '';
  };
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {question.options.map((o) => {
        const tone = o.correct
          ? 'border-emerald-700 bg-emerald-100 dark:border-emerald-400 dark:bg-emerald-950'
          : o.chosen
            ? 'border-red-700 bg-red-100 dark:border-red-400 dark:bg-red-950'
            : 'border-slate-200 dark:border-[#28324d]';
        const labelTone = o.correct ? STATUS.ok.text : STATUS.ko.text;
        return (
          <li key={o.id} className={`grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded-xl border px-3.5 py-2.5 ${tone}`}>
            <i
              aria-hidden="true"
              className={`size-5 border-2 ${question.multiple ? 'rounded-md' : 'rounded-full'} ${
                o.chosen
                  ? 'border-slate-900 bg-slate-900 dark:border-slate-100 dark:bg-slate-100'
                  : 'border-slate-500 dark:border-slate-400'
              }`}
            />
            <span><Inline text={o.text} /></span>
            <span className={`text-xs font-semibold ${labelTone}`}>{label(o)}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Tests({ tests }) {
  const passed = tests.filter((t) => t.pass).length;
  return (
    <div className={panel}>
      <h3 className={`${heading} mb-1.5 text-[.95rem]`}>Tests automatiques · {passed} sur {tests.length}</h3>
      <ul className="mt-2.5 grid list-none gap-1.5 p-0 text-[.9rem]">
        {tests.map((t, i) => (
          <li key={i} className="grid grid-cols-[22px_1fr] items-start gap-2">
            <span className={`font-bold ${t.pass ? STATUS.ok.text : STATUS.ko.text}`} aria-label={t.pass ? 'Réussi' : 'Échoué'}>
              {t.pass ? '✓' : '✗'}
            </span>
            <span>
              <Inline text={t.label} />
              {t.detail && <small className="block text-slate-500 dark:text-slate-400">{t.detail}</small>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Criteria({ criteria }) {
  if (!criteria.length) return null;
  return (
    <ul className="mt-3.5 grid list-none gap-2.5 p-0">
      {criteria.map((c) => {
        const r = c.earned / c.max;
        const bar = r >= 0.75 ? STATUS.ok.dot : r < 0.4 ? STATUS.ko.dot : STATUS.part.dot;
        return (
          <li key={c.label} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[.9rem]">
            <span>{c.label}</span>
            <b>{fmt(c.earned)} / {fmt(c.max)}</b>
            <div className="col-span-full h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-[#28324d]">
              <div className={`h-full ${bar}`} style={{ width: `${r * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Question({ q }) {
  const s = STATUS[statusOf(q)];
  const type = q.type === 'qcm' ? (q.multiple ? 'QCM · plusieurs réponses' : 'QCM · une réponse') : 'Rédaction de code';
  const tag = 'rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500 dark:border-[#28324d] dark:bg-[#0e1424] dark:text-slate-400';

  return (
    <article id={`q${q.id}`} className={`${card} overflow-hidden border-l-[6px] ${s.borderL}`}>
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5 px-5 pt-4 sm:px-[22px]">
        <h2 className={`${heading} flex-auto text-lg`}>Question {q.id}</h2>
        <span className={tag}>{type}</span>
        <span className={tag}>{LANG_NAMES[q.language]}</span>
        <span className={`${heading} font-bold ${s.text}`}>
          {fmt(q.earned)} <small className="font-medium text-slate-500 dark:text-slate-400">/ {fmt(q.max)} pts</small>
        </span>
      </div>

      <div className="grid min-w-0 gap-4 px-5 pb-5 pt-3.5 sm:px-[22px]">
        <p className="m-0 max-w-[70ch]"><Inline text={q.subject} /></p>

        {q.type === 'qcm' ? (
          <>
            {q.code && <CodeBlock language={q.language} filename={q.code.filename} value={q.code.value} />}
            <Options question={q} />
            
          </>
        ) : (
          <>
            <Files files={q.files} />
            <div className="grid gap-3.5 md:grid-cols-2">
              <div className="min-w-0">
                <h3 className={`${heading} mb-1.5 text-[.95rem]`}>Votre code</h3>
                <CodeBlock language={q.language} filename={q.student.filename} value={q.student.value} badLines={q.student.badLines} />
              </div>
              <div className="min-w-0">
                <h3 className={`${heading} mb-1.5 text-[.95rem]`}>Solution attendue</h3>
                <CodeBlock language={q.language} filename={q.solution.filename} value={q.solution.value} goodLines={q.solution.goodLines} />
              </div>
            </div>
            <Tests tests={q.tests} />
            <div className={panel}>
              <h3 className={`${heading} mb-1.5 text-[.95rem]`}>Commentaire du correcteur</h3>
              <p className="m-0 max-w-[70ch]"><Inline text={q.feedback} /></p>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

/* ---------- Page ---------- */
function CorrectionPage() {
  const [filter, setFilter] = useState('all');
  const { questions } = quiz;

  const earned = questions.reduce((sum, q) => sum + q.earned, 0);
  const max = questions.reduce((sum, q) => sum + q.max, 0);
  const count = (s) => questions.filter((q) => statusOf(q) === s).length;
  const visible = questions.filter((q) => filter === 'all' || statusOf(q) !== 'ok');
  const pct = (earned / max) * 100;

  const filterBtn = (active) =>
    `cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-medium ${focus} ${
      active
        ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
        : 'border-slate-200 bg-white text-slate-900 dark:border-[#28324d] dark:bg-[#161e33] dark:text-slate-100'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 font-['Figtree',system-ui,sans-serif] text-[#16213a] dark:bg-[#0e1424] dark:text-slate-100">
      <div className="mx-auto max-w-6xl gap-7 px-5 pb-16 pt-6 md:grid-cols-[200px_minmax(0,1fr)]">
        {/* En-tête */}
        <header className={`${card} grid items-center gap-5 p-6 sm:grid-cols-[1fr_auto] md:col-span-2`}>
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