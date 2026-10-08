import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';
export const roles = {
    admin: 1,
    trainer: 2,
    student: 3
}

export const LINE_BAD = 'bg-red-400/20 shadow-[inset_3px_0_0_#ff8b7d]';
export const LINE_GOOD = 'bg-emerald-400/15 shadow-[inset_3px_0_0_#4cd39b]';

export const LANGS = { js: javascript, php, html };
export const LANG_NAMES = { js: 'JavaScript', php: 'PHP', html: 'HTML'};
export const card = 'rounded-2xl border border-slate-200 bg-white dark:border-[#28324d] dark:bg-[#161e33]';
export const panel = 'rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 dark:border-[#28324d] dark:bg-[#0e1424]';
export const heading = "font-['Bricolage_Grotesque',sans-serif] leading-tight";
export const mono = "font-['JetBrains_Mono',monospace]";
export const focus = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-300';


export const STATUS = {
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

export const questions =
    [
        {
            id: 1,
            question: "Quelle est la capitale de Madagascar ?",
            duration: 200,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [
                {
                    type: "image",
                    path: "https://example.com/files/antananarivo.jpg"
                }
            ],

            answers: []
            // [
            //     {
            //         id: 1,
            //         label: "Antananarivo",
            //         is_correct: true
            //     },
            //     {
            //         id: 2,
            //         label: "Toamasina",
            //         is_correct: false
            //     },
            //     {
            //         id: "a3",
            //         label: "Mahajanga",
            //         is_correct: false
            //     },
            //     {
            //         id: "a4",
            //         label: "Antsirabe",
            //         is_correct: false
            //     }
            // ]
        },

        {
            id: 2,
            question: "Quel langage est principalement utilisé avec Laravel ?",
            duration: 5,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "PHP",
                    is_correct: true
                },
                {
                    id: 2,
                    label: "Python",
                    is_correct: false
                },
                {
                    id: "b3",
                    label: "Java",
                    is_correct: false
                },
                {
                    id: "b4",
                    label: "C#",
                    is_correct: false
                }
            ]
        },

        {
            id:3,
            question: "Quelle est la valeur de 2 + 2 ?",
            duration: 5,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "3",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "4",
                    is_correct: true
                },
                {
                    id: 3,
                    label: "5",
                    is_correct: false
                }
            ]
        },

        {
            id:4,
            question: "Quel protocole est utilisé pour sécuriser HTTP ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [
                {
                    type: "image",
                    path: "https://example.com/files/https.png"
                }
            ],

            answers: [
                {
                    id: 1,
                    label: "FTP",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "TLS",
                    is_correct: true
                },
                {
                    id:3,
                    label: "SMTP",
                    is_correct: false
                }
            ]
        },

        {
            id:5,
            question: "Quelle structure de données fonctionne selon le principe LIFO ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "Queue",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "Stack",
                    is_correct: true
                },
                {
                    id: 3,
                    label: "Tree",
                    is_correct: false
                }
            ]
        },

        {
            id:6,
            question: "Quel est le résultat de 10 * 5 ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "15",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "50",
                    is_correct: true
                },
                {
                    id:3,
                    label: "100",
                    is_correct: false
                }
            ]
        },

        {
            id:7,
            question: "Quel mot-clé permet de créer une classe en PHP ?",
            duration: 240,
            score: 1,
            code: "<?php\nclass Example {}",
            is_runnable: true,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "function",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "class",
                    is_correct: true
                },
                {
                    id: 3,
                    label: "object",
                    is_correct: false
                }
            ]
        },

        {
            id:8,
            question: "Quelle méthode HTTP est généralement utilisée pour créer une ressource ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "GET",
                    is_correct: false
                },
                {
                    id: 2,
                    label: "POST",
                    is_correct: true
                },
                {
                    id: 3,
                    label: "DELETE",
                    is_correct: false
                }
            ]
        },

        {
            id:9,
            question: "Quel est le rôle principal d'une base de données ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [
                {
                    type: "file",
                    path: "https://example.com/files/database-schema.pdf"
                }
            ],

            answers: [
                {
                    id: 1,
                    label: "Stocker et organiser les données",
                    is_correct: true
                },
                {
                    id: 2,
                    label: "Créer uniquement des interfaces graphiques",
                    is_correct: false
                },
                {
                    id:3,
                    label: "Compiler du code PHP",
                    is_correct: false
                }
            ]
        },

        {
            id:10,
            question: "Quel outil est utilisé pour gérer les versions d'un projet ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: 1,
                    label: "Git",
                    is_correct: true
                },
                {
                    id: 2,
                    label: "MySQL",
                    is_correct: false
                },
                {
                    id: 3,
                    label: "Docker",
                    is_correct: false
                }
            ]
        }
    ];
