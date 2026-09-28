export const roles = {
    admin: 1,
    trainer: 2,
    student: 3
}

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

            answers: [
                {
                    id: 1,
                    label: "Antananarivo",
                    is_correct: true
                },
                {
                    id: 2,
                    label: "Toamasina",
                    is_correct: false
                },
                {
                    id: "a3",
                    label: "Mahajanga",
                    is_correct: false
                },
                {
                    id: "a4",
                    label: "Antsirabe",
                    is_correct: false
                }
            ]
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
            question: "Quelle est la valeur de 2 + 2 ?",
            duration: 5,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "c1",
                    label: "3",
                    is_correct: false
                },
                {
                    id: "c2",
                    label: "4",
                    is_correct: true
                },
                {
                    id: "c3",
                    label: "5",
                    is_correct: false
                }
            ]
        },

        {
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
                    id: "d1",
                    label: "FTP",
                    is_correct: false
                },
                {
                    id: "d2",
                    label: "TLS",
                    is_correct: true
                },
                {
                    id: "d3",
                    label: "SMTP",
                    is_correct: false
                }
            ]
        },

        {
            question: "Quelle structure de données fonctionne selon le principe LIFO ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "e1",
                    label: "Queue",
                    is_correct: false
                },
                {
                    id: "e2",
                    label: "Stack",
                    is_correct: true
                },
                {
                    id: "e3",
                    label: "Tree",
                    is_correct: false
                }
            ]
        },

        {
            question: "Quel est le résultat de 10 * 5 ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "f1",
                    label: "15",
                    is_correct: false
                },
                {
                    id: "f2",
                    label: "50",
                    is_correct: true
                },
                {
                    id: "f3",
                    label: "100",
                    is_correct: false
                }
            ]
        },

        {
            question: "Quel mot-clé permet de créer une classe en PHP ?",
            duration: 240,
            score: 1,
            code: "<?php\nclass Example {}",
            is_runnable: true,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "g1",
                    label: "function",
                    is_correct: false
                },
                {
                    id: "g2",
                    label: "class",
                    is_correct: true
                },
                {
                    id: "g3",
                    label: "object",
                    is_correct: false
                }
            ]
        },

        {
            question: "Quelle méthode HTTP est généralement utilisée pour créer une ressource ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "h1",
                    label: "GET",
                    is_correct: false
                },
                {
                    id: "h2",
                    label: "POST",
                    is_correct: true
                },
                {
                    id: "h3",
                    label: "DELETE",
                    is_correct: false
                }
            ]
        },

        {
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
                    id: "i1",
                    label: "Stocker et organiser les données",
                    is_correct: true
                },
                {
                    id: "i2",
                    label: "Créer uniquement des interfaces graphiques",
                    is_correct: false
                },
                {
                    id: "i3",
                    label: "Compiler du code PHP",
                    is_correct: false
                }
            ]
        },

        {
            question: "Quel outil est utilisé pour gérer les versions d'un projet ?",
            duration: 240,
            score: 1,
            code: null,
            is_runnable: false,
            subject_id: 1,

            attachments: [],

            answers: [
                {
                    id: "j1",
                    label: "Git",
                    is_correct: true
                },
                {
                    id: "j2",
                    label: "MySQL",
                    is_correct: false
                },
                {
                    id: "j3",
                    label: "Docker",
                    is_correct: false
                }
            ]
        }
    ];
