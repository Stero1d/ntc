/**
 * Created by smalkov on 05.09.2018.
 */
import React from "react";

export const TranslateInterface_En = {
    header: {
        language: [
            { key: 0, text: 'Русский', value: 'ru' },
            { key: 1, text: 'English', value: 'en' },
            { key: 2, text: 'Deutsch', value: 'de' }
        ],
        feedBack: {
            link: 'Connect us',
            dialog: {
                title: 'Sending a request',
                theme: {
                    label: 'Theme',
                    placeholder: 'Enter theme'
                },
                description: {
                    label: 'Description',
                    placeholder: 'Enter description'
                },
                btn: {
                    label: 'Send'
                }

            }
        },
        title: 'NETWORK TECHNOLOGY CENTER',
        menuNavigation: {
            home: 'HOME',
            about: 'COMMUNITY',
            activities: 'ACTIVITIES',
            library: 'LIBRARY',
            my_publications: 'MY PUBLICATIONS'
        },
        authorization: {
            signUp: 'Sign Up',
            signIn: 'Sign In',
            account: 'the personal account',
            dialog: {
                text: {
                    auth: {
                        text_1: 'To enter the portal, enter the login and password specified during registration',
                        text_2: 'No account? ',
                        text_3: 'Sign up'
                    },
                    reg: {
                        text_1: 'Have an account?',
                        text_2: 'Sign in'
                    }
                },
                registrationTitle: 'Registration',
                successRegistration: {
                    title: 'Registration successfully completed',
                    text: ''
                },
                errorRegistration: 'Error registration',
                backPortal: 'Return to the portal',
                authTitle: 'Login to your account',
                fio: {
                    label: 'Full name',
                    placeholder: 'Enter name'
                },
                email: {
                    label: 'e-mail',
                    placeholder: 'Enter e-mail'
                },
                password: {
                    label: 'Password',
                    placeholder: 'Enter password'
                },
                registrationText: {
                    link_1: 'privacy Policy',
                    link_2: 'user agreement',
                    text_1: 'By registering, you agree to the terms and conditions ',
                    text_2: ' and ',
                },
                signUp: 'Sign up',
                signIn: 'Sign in',
                socialRegistration: 'Password'
            }
        },
        user: {
            published: 'Add article',
            profileMenu: {
                settings: "Setting profile",
                published: "My publications",
                administration: "Administration",
                signOut: "Sign Out"
            }
        },
        search: 'Search the portal...',
        mobileMenu: {
            language: 'LANGUAGE',
            feedBack: 'CONNECT US',
            exit: 'LOG OUT'
        }
    },
    home: {
        leftPanel: {
            newArticles: {
                title: 'New articles',
                link:{
                    name: 'new_articles',
                    label: 'All new articles'
                }
            },
            popularArticles: {
                title: 'Popular articles',
                link: {
                    name: 'popular_articles',
                    label: 'All popular articles'
                }
            },
            readNext: 'Read more'
        },
        rightPanel: {
            title: 'EVENTS',
            linkTitle: 'All events'
        },
        subscription: {
            title: 'Subscribe to the daily newsletter',
            placeholder: 'Enter e-mail',
            btnLabel: 'Subscribe'
        }
    },
    setup: {
        leftMenu: {
            personalData: 'Personal data',
           /* settingsAccount: 'Settings account'*/
        },
        rightPanel: {
            personalData: 'Personal data',
            name: {
                label: 'Full name',
                placeholder: 'Enter name'
            },
            rank: {
                label: 'Science Degree',
                placeholder: 'Enter Science degree'
            },
            birthday: {
                label: 'Date of birth',
                number: 'Number',
                month: {
                    label: 'Month',
                    options: [
                        "January", "February", "March",
                        "April", "May", "June",
                        "July", "August", "September",
                        "October", "November","December"
                    ],
                    optionsMonth: [
                        "January", "February", "March",
                        "April", "May", "June",
                        "July", "August", "September",
                        "October", "November","December"
                    ]
                },
                year: 'Year'
            },
            achievements: {
                label: 'Scientific achievements'
            },
            about: {
                label: 'About'
            },
            city: {
                label: 'City',
                placeholder: 'Enter city'
            },
            btnSave: 'Save changes',
            avatar: {
                photo: 'Photo',
                notPhoto: 'Not photo',
                download: 'Upload photo',
                delete: 'Delete photo'
            },
            error: {
                field: 'Fill out the required field'
            }

        }
    },
    about : {
        tabs: {
            mission: 'Mission statement',
            introduction: 'Introduction',
            goals: 'Main goals',
            specifications: 'Specifications',
        },
        information: {
            content: {
                mission: {
                    title: 'Mission statement',
                    content: [ {
                        p: {
                            className: '',
                            text: 'The closed network community is focused upon the cross-disciplinary concept of network structures with special emphasis upon its implications for modern-day humankind. The mission of this community is to help the people around the globe make good use of network structures’ enormous potential for the purpose of securing a peaceful, dignified and prosperous life for all citizens of Planet Earth \n'
                        }}, {
                        p: {
                            className: '',
                            text: 'The community sets out to accomplish the following three interconnected objectives:'}},
                        {ol: ['\tConducting multidimensional and multidisciplinary  research concerning the concept of network structures , one of the core concepts of modern science,  and also the new role of network structures as a part of the emergent social, political, economic, and cultural superreality', '\tMaking efforts to provide the material, legal, and psychological foundations   for the development and promotion of socially useful network structures and to harmonize their interaction with non-network structures such as centralized hierarchies and (quasi-)market structures', '\tConsulting the members of network structures in various spheres of society including business, civil society, education, health care, etc.; helping them create optimum organizational scenarios for their specific goals']}]
                },
                introduction: {
                    title: 'Introduction',
                    content: [
                        {br: 'It is widely accepted in the literature on “network science” that a network is  defined as any “set of items, which we will call vertices or sometimes nodes, with connections between them, called edges” (Newman, M. E. J. (2003). The structure and function of complex networks. SIAM Review, 45(2), 167–256; p.2), and this definition has been adopted by a large number of scientists and scholars around the world.  In terms of this interpretation, the analytical tools that deal with centrality measures, clustering, and community structure-related criteria, small-world behavior, and other network characteristics have provided important insights into the organization and functioning of various objects, including biological systems and human society.'},
                        {br: 'While considering this general definition as the conceptual basis of its own activities, our community places special emphasis on a more specific interpretation of the network concept  that has already been used by some scholars in the humanities and social sciences, starting from the 1980s. “According to this more specific definition, not all sets of connected items may be called networks. '},
                        {br: 'A network lacks a central pacemaker (leader, dominant element), and its activities and collective behaviors result from cooperation among its members often involving a number of partial leaders with limited power and competence. This is exemplified by the World Wide Web, which is largely based upon this organizational principle” (Oleskin, A. V. (2014). Network Structures in Biological Systems and in Human Society. Nova Science Publ. Hauppauge (New York); pp.11-12).'},
                        {br: 'This interpretation is also exemplified by the associations of human individuals or their groups that lack a central leader (pace-maker, boss…). The functioning of such decentralized network structures is based on complex interactions among their multiple partial, project-oriented, or temporary quasi-leaders.  Such networks are contrasted with centralized hierarchies which are managed and controlled by a single leader (boss). Decentralized networks are also to be distinguished from market-type structures in which their members (nodes)  predominantly compete rather than cooperate with one another. Herebelow, we use the term “network structure” or just “network” to refer to such decentralized cooperative  network structures (DCNSs).'},
                        {br: 'Of paramount scientific and philosophical importance is the fact that decentralization and internal cooperation represent universal organizational principles; therefore, analogs of what we call “DCNSs” are to be found in diverse kinds of systems, including conglomerations of stars, crystals, ensembles of elementary particles and technical devices. The diversity of network-structured systems notwithstanding, this community primarily concerns itself with the decentralized networks of human society and the human psyche; they are to be compared with DCNS analogs in various biological systems. This comparison enables singling out typical organizational paradigms to be creatively applied to human social networks.'}
                    ],
                },
                goals: {
                    title: 'Main goals',
                    content: [
                        {p: {
                                className: 'text_blue',
                                text: '1. Conducting basic and applied research on decentralized cooperative network structures.'
                            }},
                        {p: {
                                className: '',
                                text: 'In the long run, an unprecedented step should be taken: an interdisciplinary, initially altruistic, team of competent enthusiasts should be set up to deal with the aforementioned challenging task. To an extent, international networked research teams that have recently been established, e.g., in Santa-Fe and Palo-Alto (USA), can be regarded as its forerunners. The prospective team’s internal organisation  should conform with the principle of decentralised network organization. The intellectual production of the team is expected to enrich our knowledge in various fields of science. To reiterate, DCNSs represent an interdisciplinary phenomenon that, apart from human society, also exists in living nature, IT systems, and the human psyche; the notion of DCNSs also has important religious implications. Notwithstanding the above, a DCNSs-exploring creative team is expecte to produce the most important effect in IT, nano- and biotechnology, health care, social politics, and in economics. Owing to the interdisciplinary nature of DCNSs, the members of the prospective creative team will be able to take organizational scenarios used by a specific kind of systems and apply them to systems of a different kind. In particular, living nature provides the developers and promoters of decentralized network structures in human society with a whole palette of organizational recipes to be creatively modified and employed in human society. This goal includes the following important subgoals:'
                            }},
                        {ul: ['Exploring networks in business','Exploring networks in politics', 'Comparing networks in human society to those in biological systems', 'Understanding networks in the human psyche', 'Exploring networks in community-type social structures', '•\tUnraveling network structures in the media', '•\tProviding conceptual underpinnings for innovative networks']},
                        {p: {
                                className: 'text_blue',
                                text: '2. Promoting and propagandizing constructive (useful) network structures in society.'
                            }},
                        {p: {
                                className: '',
                                text: 'We emphasize that the virtual community to be set up  will be involved in designing and implementing financial and legal measures as well as social-technology approaches and psychological techniques for the purpose of promoting socially useful (constructive, humanitarian, patriotic, etc.) network structures while exposing and suppressing “dark” (criminal, terrorist, corrupt, etc.) network structures. The following are the relevant subgoals:'
                            }},
                        {ul: ['Developing psychological networks-promoting techniques', '•\tExploiting the media for the purpose of supporting and propagandizing useful DCNSs',
                                'Using political platforms and movements for the purpose of supporting and propagandizing useful DCNSs', 'Providing adequate material support for DCNSs',
                                'Developing an adequate legal framework for the development of DCNSs']},
                        {p: {
                                className: 'text_blue',
                                text: '3. Consulting decentralized network structures.'
                            }},
                        {p: {
                                className: '',
                                text: 'In our opinion, establishing a system of state-sponsored or private investor-funded counseling bodies would be an expedient practical step. Such counseling bodies would help DCNSs cope with various kinds of organizational, technical, or psychological problems and issues these innovative structures will inevitably face in diverse spheres of society, including politics, business, helath care, education, and scientific research activities. Emphasis should be placed on the following subgoals:'
                            }},
                        {ul: ['Setting up business incubators', '•\tConsulting intermediary (broker) networks',
                                'Consuting hierarchies as they interact with DCNSs', 'Consulting social activists’ networks',
                                'Consulting network governance regulators and decision-making network nodes (hubs)']},
                    ]
                },
                specifications: {
                    title: 'Specifications',
                    content: [
                        {p: {
                                className: 'text_blue',
                                text: 'Applying decentralized network organizational principles:\n' +
                                ' Association of Specialists in Microbial Communication, Neurochemicals, and Probiotics.  A Proposal. \n'
                            }},
                        {br: 'The implementation of various paradigms of network structures can be illustrated in the example of an imaginary  network. It should actually be established, in the author’s opinion, for the purpose of bringing together the scientists and health care specialists that deal with the currently popular area of research combining Microbial Communication, Neurochemicals, and Probiotics. This network structure could be of direct relevance to  restorative medicine. Its importance is primarily due to the fact that microorganisms, including useful probiotics, produce a wide spectrum of neuroactive substances that influence the human brain. Taking account of this influence is of medical and psychological importance. This interdisciplinary field is not on the agenda of any research institute. Such institutes only deal with some of the facets of the issue separately'} ,
                        {br: 'A pilot network structure for carrying out the aforementioned project comprises three modules that are concerned with the following subprojects'},
                        {br: 'Module 1: Social Organization and Communication of Microorganisms'},
                        {br: 'Module 2: Impact of Microbial Products on the Brain'},
                        {p: {
                                className: '',
                                text: 'Module 3: Probiotics'
                            }},
                        {p: {
                                className: 'text_blue',
                                text: 'Applying decentralized network organizational principles: Exploration of Mars'
                            }},
                        {p: {
                                className: '',
                                text: 'The long-cherished dream of traveling to Mars and other celestial bodies  provides an opportunity to use network organizational principles both with regard to designing such a project and carrying it out. Space provides much room for innovative  international missions that can be based on decentralized network structures, and network technology in terms of space exploration projects is expected to prevent or mitigate conflicts in space and to impede all kinds of space arms race.'
                            }},
                    ]
                }
            }
        },
    },
    activities: {
        tabs: {
            members: 'Community members',
            formsActivities: 'Forms activities',
            contacts: 'Contact information',
            events: 'Events',
            codex: 'Ethtical statement'
        },
        communityMembers: {
            title: 'Community members',
            userInfoCard: {
                title: 'USER CARD',
                article: 'Articles'
            }
        },
        formsActivities: {
            title: 'Forms activities',
            text: [{
                textBlock: 'Within the framework of a closed on-line community, our activities f necessity  boil down to posting new dicta, texts, newspaper clippings, videos and pictures as well as criticizing  blogs produced by others. However, a really efficient virtual community should eventually  be devirtualized: it should set itself the goal of functioning in the actual world beyond the realm of websites and chats.  Decentralized networks that actually existed for millions of years before  the advent of the digital era as, e.g., nonhierarchical hunter-gatherer bands, and it is only natural for them to be predisposed for devirtualization that can take several different forms:',
                list: [
                    '\tSetting up a successful real-life DCNS in any part of the world and in any sphere of society  – exemplified by a networked West-Antarctica Penguin Protection Club or an imaginary (so far)  networked nonhierarchical Clean Toilets alliance in Zimbabwe – will inevitably cause people elsewhere in the world and in a different sphere of society to set up similarly efficient decentralized network structures',
                    '\tSubmitting an application or a petition to governmental officials that is  aimed at promoting the development of any kind of network structures including, for instance, a network composed of  angry bank depositors, is expected to produce a resonance effect on society and result in strengthening the network-promoting movement  not only locally but–in the long run–also globally ',
                    '\tPublishing network-promoting materials in periodicals and propagandizing them in the media should exert  considerable influence on the mind and the heart  of the people at large',
                    '\tLast nor least, carrying out the dream of bringing together the community’s members during a professional conference or symposium or, what is still better, during the course of  project supported by a grant or subsidy'
                ]
            }]
        },
        contacts: {
            title: 'CONTACTS',
        },
        events: {
            title: 'EVENTS',
        },
        codex: {
            title: 'Ethtical statement',
            text: 'Contrary to a relatively widespread belief, science has never been ethically neutral. Scientists and scholars are to be held responsible for their activities; they have the power to help humankind and to do much harm to it. Network Structures, the professed subject of this community and a currently widespread social technology, are also ambivalent in terms of their impact on human society; they are not less potentially dangerous than nuclear  weapons  or genetic engineering. \n' +
            'The members and supporters of our community should be fully aware of their burden of ethical  responsibility\n'

    }
    },
    library: {
        tabs: {
            our_publications: 'Our publications'
        }
    },
    articlePublishing: {
        createArticle: {
            title: {
                label: 'New article',
                create: {
                    label: 'New article',
                },
                edit: {
                    label: 'Edit article',
                }
            },
            fullScreen: 'Maximize to full screen',
            collapse: 'Collapse',
            saveAs: 'Save as draft',
            fields: {
                nameArticle: {
                    label: 'Title',
                    placeholder: 'Enter title',
                    required: true
                },
                subject: {
                    label: 'Subject',
                    required: true,
                    placeholder: 'Choise subject',
                    btnLabel: 'Upload image for title'
                },
                upLoadFile: 'Upload image',
                changeFile: 'Change image',
                deleteFile: 'Delete image',
                textFile: 'This image will appear next to the title of your article',
                annotation: {
                    label: 'Annotation',
                    placeholder: 'Enter annotation',
                    required: true
                },
                textArticle: {
                    label: 'Text',
                    link: 'Download text file'
                },
                keyWords: {
                    label: 'Key words',
                    link: 'Enter key words'
                },
                actions: {
                    preview: 'PREVIEW',
                    closePreview: 'Close preview',
                    submit: 'Submit for review'
                }
            }
        },
        publishing_rules: {
            rules: {
                title: 'Publishing rules articles',
                text: [
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                ]
            },
            aboutModeration: {
                title: 'About moderation',
                text: [
                    {label: 'Публикация не должна нарушать правила сайта'},
                    {label: 'Публикация не должна нарушать правила сайта'},
                ]
            }
        }
    },
    infoArticle: {
        moreArticles: 'MORE ON THEME',
        comments: {
            title: 'Comments',
            allComments: 'All COMMENTS',
            placeholder: 'Write your comment...',
            collapse: 'COLLAPSE COMMENTS',
            reply: 'Reply',
            send: 'Send'
        }
    },
    my_publications: {
        tabs: {
            all_my_publications: 'All publications',
            published: 'Published',
            draft: 'Draft',
            review: 'Unpublished',
            archive: 'Archive',
            declined: 'Declined'
        },
        status: {
            published: 'Published',
            draft: 'Draft',
            review: 'Review',
            archive: 'Archive',
            declined: 'Declined',

        },
        menu: {
            edit: 'Edit',
            delete: 'Delete'
        }
    },
    administration: {
        tabs: {
            users: 'Users',
            articles: 'Publications',
            events: 'Events',
        },
        table: {
            users: {
                name: {
                    label: 'ФИО',
                    style: {width: '34%'}
                },
                email: {
                    label: 'E-mail',
                    style: {width: '20%'}
                },
                dataRegistration: {
                    label: 'Date of registration',
                    style: {width: '21%'}
                },
                status: {
                    label: 'Status',
                    style: {width: '25%'}
                }
            },
            articles: {
                name: {
                    label: 'Name ',
                    style: {width: '34%'},
                    type: 'text'
                },
                subject: {
                    label: 'Subject',
                    style: {width: '20%'},
                    type: 'text'
                },
                dataCreate: {
                    label: 'Date of creation',
                    style: {width: '21%'},
                    type: 'text'
                },
                status: {
                    label: 'Status',
                    style: {width: '25%'},
                    type: 'actions'
                }
            },
            events: {
                name: {
                    label: 'Name event',
                    style: {width: '55%'},
                    type: 'text'
                },
                dateCreate: {
                    label: 'Date create',
                    style: {width: '20%'},
                    type: 'text'
                },
                datePublication: {
                    label: 'Date publication',
                    style: {width: '20%'},
                    type: 'text'
                }
            }
        },
        notFoundData: {
            users: 'Not users',
            articles: 'Not publications',
            events: 'Not events'
        },
        status: {
            active: 'Registration confirmed',
            declined: 'Registration rejected',
            locked: 'User is blocked',
            deleted: 'User deleted',
            published: 'Published'
        },
        other: {
            requestUser: 'Request for registration',
            requestArticle: 'Request for publication'
        },
        menu: {
           locked: 'Lock',
            unlocked: 'Unlock',
            deleted: 'Delete'
        },
        buttons: {
            confirm: 'Confirm',
            reject: 'Reject',
            delete: 'Delete'
        }
    },
    createEvent: {
        title: {
            edit: {
                label: 'Edit event'
            },
            create: {
                label: 'Create event'
            }
        },
        fields: {
            publishDate: {
                label: 'Date publication',
            },
            caption: {
                label: 'Title event',
                placeholder: 'Enter title event...'
            },
            text: {
                label: 'Text event',
                placeholder: 'Enter text event...'
            },
            actions: {
                save: 'Save',
                cancel: 'Cancel'
            }
        }
    },
    footer: {
        home: {
            title: 'HOME',
            array: [
                {
                    newArticles: 'New articles',
                    link: 'new_artciles',
                    tab: ''
                },
                {
                    popularArticles: 'Popular articles',
                    link: 'popular_artciles',
                    tab: ''
                }
            ]
        },
        about: {
            title: 'COMMUNITY',
            array: [
                {
                    mission: 'Mission',
                    link: 'about',
                    tab: 'mission'
                },
                {
                    preamble: 'Preamble',
                    link: 'about',
                    tab: 'preamble'
                },
                {
                    aim: 'Main goals',
                    link: 'about',
                    tab: 'aim'
                },
                {
                    specifications: 'Specifications',
                    link: 'about',
                    tab: 'specifications'
                }
            ]
        },
        activities: {
            title: 'ACTIVITIES',
            array: [
                {
                    members: 'Community members',
                    link: 'activities',
                    tab: 'members'
                },
                {
                    formsActivities: 'Forms activities',
                    link: 'activities',
                    tab: 'formsActivities'
                },
                {
                    contacts: 'Contact information',
                    link: 'activities',
                    tab: 'contacts'
                },
                {
                    events: 'Events',
                    link: 'activities',
                    tab: 'events'
                },
                {
                    codex: 'Codex',
                    link: 'activities',
                    tab: 'codex'
                },
            ]
        },
        library: {
            title: 'LIBRARY',
            array: [
                {
                    ourPublications: 'Our publications',
                    link: 'library',
                    tab: 'our_publications'
                },
                {
                    otherPublications: 'Other publications',
                    link: 'library',
                    tab: 'Other_publications'
                }
            ]
        }
    },
    other: {
        textNoData: 'No publications'
    }
};