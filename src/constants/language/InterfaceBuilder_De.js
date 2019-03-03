/**
 * Created by smalkov on 05.09.2018.
 */
import React from "react";

export const TranslateInterface_De = {
    header: {
        language: [
            { key: 1, text: 'Русский', value: 'ru' },
            { key: 2, text: 'English', value: 'en' },
            { key: 3, text: 'Deutsch', value: 'de' }
        ],
        feedBack: {
            link: 'Kontaktieren Sie uns',
            dialog: {
                title: 'Anfrage senden',
                theme: {
                    label: 'Thema',
                    placeholder: 'Betreff eingeben'
                },
                description: {
                    label: 'Beschreibung',
                    placeholder: 'Geben Sie eine Beschreibung ein'
                },
                btn: {
                    label: 'Zu senden'
                }

            }
        },
        title: 'NETZWERK-TECHNOLOGIEZENTRUM',
        menuNavigation: {
            home: 'ZUHAUSE',
            about: 'GEMEINSCHAFT',
            activities: 'TÄTIGKEIT',
            library: 'BIBLIOTHEK',
            my_publications: 'MEINE VERÖFFENTLICHUNGEN'
        },
        authorization: {
            signUp: 'Um sich zu registrieren',
            signIn: 'Anmelden',
            account: 'in einem privaten Büro',
            dialog: {
                text: {
                    auth: {
                        text_1: 'Um das Portal zu betreten, geben Sie den Benutzernamen und das Passwort ein, die während der Registrierung angegeben wurden',
                        text_2: 'Kein Konto? ',
                        text_3: 'Melde dich an'
                    },
                    reg: {
                        text_1: 'Habe ein Konto?',
                        text_2: 'Anmelden'
                    }
                },
                registrationTitle: 'Registrierung',
                successRegistration: {
                    title: 'Die Registrierung wurde erfolgreich abgeschlossen',
                    text: ''
                },
                errorRegistration: 'Registrierungsfehler',
                backPortal: 'Kehre zum Portal zurück',
                authTitle: 'Melden Sie sich bei Ihrem Konto an',
                fio: {
                    label: 'Vollständiger Name',
                    placeholder: 'Name eingeben'
                },
                email: {
                    label: 'E-Mail',
                    placeholder: 'E-Mail eingeben'
                },
                password: {
                    label: 'Passwort',
                    placeholder: 'Passwort eingeben'
                },
                registrationText: {
                    link_1: 'Datenschutzrichtlinie',
                    link_2: 'Benutzervereinbarung',
                    text_1: 'Mit der Registrierung stimmen Sie den Bedingungen zu ',
                    text_2: ' und ',
                },
                signUp: 'Um sich zu registrieren',
                signIn: 'Anmelden',
                socialRegistration: 'Registrierung über soziale Netzwerke'
            }
        },
        user: {
            published: 'Füge einen Artikel hinzu',
            profileMenu: {
                settings: "Profileinstellungen",
                published: "Meine Veröffentlichungen",
                administration: "Verwaltung",
                signOut: "Ausstieg"
            }
        },
        search: 'Portalsuche...',
        mobileMenu: {
            language: 'SPRACHE',
            feedBack: 'KONTAKTIEREN SIE UNS',
            exit: 'AUSSTIEG'
        }

    },
    home: {
        leftPanel: {
            newArticles: {
                title: 'Neue Artikel',
                link:{
                    name: 'new_articles',
                    label: 'Alle neuen Artikel'
                }
            },
            popularArticles: {
                title: 'Beliebte Artikel',
                link: {
                    name: 'popular_articles',
                    label: 'Alle beliebten Artikel'
                }
            },
            readNext: 'Weiter lesen'
        },
        rightPanel: {
            title: 'EREIGNISSE',
            linkTitle: 'Alle Ereignisse'
        },
        subscription: {
            title: 'Abonnieren Sie den täglichen Newsletter',
            placeholder: 'Geben Sie Ihre E-Mail-Adresse ein',
            btnLabel: 'Jetzt abonnieren'
        }
    },
    setup: {
        leftMenu: {
            personalData: 'Persönliche Daten',
            /*settingsAccount: 'Настройка аккаунта'*/
        },
        rightPanel: {
            personalData: 'Persönliche Daten',
            name: {
                label: 'Name Vorname',
                placeholder: 'Name eingeben'
            },
            rank: {
                label: 'Abschluss',
                placeholder: 'Geben Sie einen Abschluss ein'
            },
            birthday: {
                label: 'Geburtsdatum',
                number: 'Zahl',
                month: {
                    label: 'Monat',
                    options: [
                        "Januar", "Februar", "März",
                        "April", "Mai", "Juni",
                        "Juli", "August", "September",
                        "Октябрь", "November","Dezember"
                    ],
                    optionsMonth: [
                        "Januar", "Februar", "März",
                        "April", "Mai", "Juni",
                        "Juli", "August", "September",
                        "Октябрь", "November","Dezember"
                    ]
                },
                year: 'Jahr'
            },
            achievements: {
                label: 'Wissenschaftliche Errungenschaften'
            },
            about: {
                label: 'Über mich'
            },
            city: {
                label: 'Stadt',
                placeholder: 'Geben Sie die Stadt ein'
            },
            avatar: {
                photo: 'Fotografie',
                notPhoto: 'Kein Foto',
                download: 'Laden Sie ein Foto hoch',
                delete: 'Foto löschen'
            },
            btnSave: 'Änderungen speichern',
            error: {
                field: 'Füllen Sie das erforderliche Feld aus'
            }

        }
    },
    about: {
        tabs: {
            mission: 'Mission',
            preamble: 'Vorwort',
            aim: 'Hauptziele',
            specifications: 'Konkretisierung',
        },
        information: {
            title: 'Центр сетевых технологий (ЦСТ) (NTC - Network Technology Center)',
            content: {
                mission: {
                    title: 'Mission',
                    content: [ {
                        p: {
                            className: '',
                            text: 'Die geplante virtuelle Gemeinschaft befasst sich mit dem fachübergreifenden Netzwerkstrukturen-Konzept   unter besonderer Berücksichtigung  seiner Realisierung in der menschlichen Gesellschaft. Die Online-Gemeinschaft  sieht ihre Mission darin, die maximal vollständige Ausbeutung des enormen   Potentials von Sozial-Netzwerkstrukturen zu ermöglichen,  damit alle Bürger des Planeten Erde ein friedliches und prosperierendes – ein lebenswertes–Leben genießen können.'
                        }}, {
                        p: {
                            className: '',
                            text: 'Die Gemeinschaft  konzentriert sich auf drei miteinander verbundene Aufgaben:'}},
                        {ol: ['\tMultidisziplinäre fachübergreifende Forschung zum Thema „Netzwerkstrukturen als Kernkonzept der modernen Wissenschaft und zugleich als die neue soziale, ökonomische, kulturelle und politische Superrealität“','\tAllseitige materielle und juristische Förderung und Unterstützung von sozial nützlichen Netzwerkstrukturen, Vermittlung ihrer Interaktionen mit Sozialstrukturen anderer Art (Hierarchien und Quasi-Marktstrukturen)', '\tBeratung von Vertretern von Netzwerkstrukturen in verschiedenen Sozialsphären (die Business, die Bürgergesellschaft, das Bildungssystem, das Gesundheitswesen usw.), Hilfe bei der Erarbeitung optimaler Organisationsszenarien für die Realisierung ihrer spezifischen  Ziele ']}]
                },
                preamble: {
                    title: 'Vorwort',
                    content: [
                        {br: 'Die beantragte geschlossene virtuelle Netzwerkgruppe soll sich mit dem fachübergreifenden Forschungsbereich  dezentralisierte Netzwerkstrukturen (dNs) beschäftigen. Die besondere Bedeutung des Forschungsbereichs  steht im Zusammenhang mit der zunehmenden Verbreitung derartiger Netzwerkstrukturen in verschiedenen Gesellschaftssphären. Eine Netzwerkstruktur (oder bloβ: ein Netzwerk) ist eine Gesamtheit von Elementen (Knoten), von denen einige durch Verbindungen (Kanten) miteinander verknüpft sind. Die Netzwerkrepräsentanz von einem System ermöglicht die Analyse einiger wesentlicher Eigenschaften des Systems, welche  die Prognostizierung seiner Verhaltensdynamik fördern sowie u. U. die Kontrolle über das System garantieren dürften.ermöglichen? In der ökologischen und auch sozialwissenschaftlichen Literatur werden Netzwerke oft als dezentralisierte kooperative Strukturen angesehen.'},
                        {br: 'Typische Beispiele hierfür sind  Kollektive (Organisationen, Unternehmen,  Assoziationen, Gemeinschaften usw.), die keine Führungsperson an der Spitze haben und deren Funktionieren auf komplexen Interaktionen zwischen mehreren  Anführern mit zeitlich und/oder funktional begrenzter Autorität basiert. Solche dezentralisierten Strukturen sollten zentralisierten Hierarchien entgegengesetzt werden, in denen es einen zentralen Leader (Boss, Anführer) notwendigerweise gibt. Allerdings ist bei weitem nicht jede hierarchielose Struktur als dezentralisierte Netzwerkstruktur zu bezeichnen. Markt- oder Quasimarktstrukturen in denen Konkurrenz zwischen ihren Elementen und nicht ihre Kooperation dominiert  sind keine dNs unserer Ansicht nach.  Dezentralisierte Netzwerkstrukturen, die auf stabilen Kooperationsbeziehungen zwischen ihren Bestandteilen basieren, sind nicht nur in der menschlichen   Gesellschaft zu finden. Vielmehr handelt es sich um ein universelles Organisationsprinzip, dem dezentralisierte kooperative Interaktionen zugrundeliegen uns das sich auf die menschliche Gesellschaft  anwenden lässt. Analoga solcher dezentralisierter kooperativer Netzwerkstrukturen existieren in diversen Systemen, die von Sternassoziationen über Kristalle bis  hin zu Gruppen von Elementarteilchen und IT-Geräten reichen. '},
                        {br: 'Ungeachtet der Vielfalt von Objekten, die sich als dNs darstellen lassen, konzentrieren wir uns in erster Linie auf Netzwerkstrukturen in der Gesellschaft und in der Innenwelt eines menschlichen Individuums, wobei wir sie mit ihren Analoga in diversen Biosystemen vergleichen.'},
                    ],
                },
                aim: {
                    title: 'Hauptziele',
                    content: [
                        {p: {
                                className: 'text_blue',
                                text: '1.\tGrundlagen- und angewandte Forschungen zu Dezentralisierten Kooperativen Netzwerkstrukturen.'
                            }},
                        {p: {
                                className: '',
                                text: 'Langzeitperspektive haben wir eine bislang noch nie realisierte Idee im Sinn: es sollte eine fachübergreifende, anfänglich altruistische  Gemeinschaft von Enthusiasten gegründet werden, die sich der Erforschung von dezentralisierten kooperativen Netzwerkstrukturen widmen möchte! Als Vorläufer oder Analoga einer derartigen imaginären Gemeinschaft könnten vielleicht solche globalen interdisziplinären Forschungszentren wie die in Sante-Fe oder Palo-Alto (USA) gelten. Die innere Organisation der Gemeinschaft sollte dem dezentralisierten Netzwerk-Prinzip entsprechen. Ihre Tätigkeit (wenn auch als Freizeithobby betrachtet) könnte Beiträge zu unseren Kenntnissen auf verschiedenen Wissenschaftsgebieten leisten, zumal die Netzwerkstruktur einen fachübergreifenden Begriff darstellt. Er ist – neben der menschlichen Gesellschaft -- auf Bioobjekte, technische Einrichtungen oder die Psyche eines Individuums anwendbar; Netwerkstrukturen haben auch religiöse Konnotationen. Nichtsdestoweniger müsste der Haupteffekt der virtuellen dNs-Gemeinschaft in der menschlichen Gesellschaft zustandekommen, wobei vor allem an seine Wirkung auf das Gesundheitswesen, die IT- und Biotechnologie, die Sozialpolitik und die Wirtschaft zu denken ist. Dank ihres fachübergreifenden Charakters könnten dNs-Gemeinischaftsmitglieder Organisationsmuster von einem Wissenschaftsbereich auf einen anderen kreativ übertragen. Insbesondere bietet die lebende Natur eine reiche Palette von Organisationsrezepten für Netzwerkstrukturen-Entwickler und Förderer in der menschlichen Gesellschaft. Im Rahmen  von  dieser Zielsetzung möchten wir auf folgende Schwerpunkte hinweisen:'
                            }},
                        {ul: ['Netzwerkstrukturen im Business-Bereich', 'Netzwerkstrukturen in der Politik', 'Netzwerkstrukturen in der Biologie', 'Netzwerkstrukturen in der Psychologie unter Berücksichtigung  der menschlichen Intelligenz ',
                                'Netzwerkstrukturen in Menschengruppen und Gemeinschaften', 'Netwerkstrukturen in den Medien', 'Innovative Netzwerkstrukturen']},
                        {p: {
                                className: 'text_blue',
                                text: '2. Die Förderung und Propagierung von nützlichen (“positiven”) Netzwerkstrukturen in der Gesellschaft.'
                            }},
                        {p: {
                                className: '',
                                text: 'Die geplante virtuelle Gemeinschaft geht davon aus, dass finanzielle, gesetzliche und auch psychotechnologische Maβnahmen zur Förderung  von Netzwerken, die gesellschafltlich nützliche  (konstruktive, humanitäre, patriotische usw) Ziele verfolgen.Daneben sollten potentiell gefährliche Netzwerkstrukturen einschlieβlich korrumpierter oder terroristischer Schattennetzwerke aufgespürt und verharmlost werden, wobei die virtuelle Gemeinschaft auch eine Rolle spielen könnte.  Es gibt hiermit folgende wichtige Schwerpunkte:'
                            }},
                        {ul: ['Psychotechnische Ansätze', 'Informationsmedien als Mittel zur Förderung von Netzwerkstrukturen',
                                'Politische Plattformen und Bewegungen als Potentiale für nützliche Netzwerke ', 'Materielle Unterstützung von Netzwerken',
                                'Rechtliche Basis von Netzwerken']},
                        {p: {
                                className: 'text_blue',
                                text: '3. Die Beratung von Netzwerkstrukturen. '
                            }},
                        {p: {
                                className: '',
                                text: 'Gemeinschaft setzt sich für die Entwicklung von staatlich oder privat finanzierten Beratungszentren, die den Vertretern von dezentralisierten Netzwerkstrukturen im Bereich der Politik, der Business, des Gesundheitswesen oder des Bildungssystems organisatorische, technische oder psychologische Probleme lösen helfen würden. Wir möchten dabei folgende Schwerpunkte hervorheben:'
                            }},
                        {ul: ['Beratung von Gründerzentren zur Unterstützung technologieorientierter, möglichst innovativer Neugründungen und Jungunternehmen', 'Beratung von Vermittler-Netzwerke',
                                'Beratung von hierarchischen Strukturen', 'Beratung von Sozialaktivisten-Netwerken',
                                'Beratung von Netwerk-Verwaltungsvertretern sowie von Entscheidungsfunktionsknoten']},
                    ]
                },
                specifications: {
                    title: 'Konkretisierung',
                    content: [
                        {p: {
                                className: 'text_blue',
                                text: 'Konkretisierung der obengenannten Ziele in Bezug auf das  Thema MIKROBIELLE KOMMUNIKATION, NEUROMEDIATOREN UND PROBIOTIKA'
                            }},
                        {p: {
                                className: '',
                                text: 'Derzeitdurchläuft die Mikrobiologie einen Paradigmenwechsel : im Mittelpunkt stehen jetzt nicht mikrobielle Reinkulturen sondern Mehrspezies-Assoziationen,  anstatt einzelner Zellen werden jetzt vorherrschend komplexe  integrierte Zellgemeinschaften (Kolonien, Biofilme, Flocs, Granulen usw)  erforscht, die einige exotische Mikrobiologen, z. B. James Shapiro und Eschell Ben-Jacob als mehrzellige Organismen bezeichnet werden. Kennzeichnend für solche Systeme ist ein intensiver Informationsaustausch zwischen mikrobielle Zellen; besonders eingehend wurde in den letzten Jahrzehnten verschiedene Varianten des Quorum-sensing-Phänomens untersucht. Mikrobielle Biofiulme wachsen in diversen ökologischen Nischen innerhalb des menschlichen Organismus, insbesondere im Darmkanal. Das letztgenannte Thema ist nicht nur von mikrobiologischer und klinischer (gastroenterologischer) Bedeutung, sondern auch von Interesse in Bezug auf die Neurologie (einschließlich der Neurochemie).  Es mehren sich Informationen über die gegenseitige Kommunikation zwischen der Mikrobiota und dem Wirtsorganismus „in der Sprache“ von Neuromediatoren und Hormonen, einschließlich des Serotonins, Noradrenalins, Dopamins, Histamins usw.  Vom neurochemischen Standpunkt aus verhält sich die sozial organisierte Mikrobiota  als Analogon des Gehirns des Wirtsorganismus. Aufgrund der Ausscheidung von Neuromediatoren sollte ein neurochemischer Effekt auch für viele der Mikroorganismen die heutztage als Probiotika betrachtet werden charakteristisch sein.'
                            }},
                        {p: {
                                className: '',
                                text: 'Die Gründung einer fachübergreifenden kreativen Labors ist eine aktuelle Herausforderung wegen der besonderen Bedeutung des Schnittpunkts zwischen der Mikrobiologie und der Neurochemie (sowie der Endokrinologie) im Zusammenhang mit den Interaktionen zwischen dem Wirt und der Mikrobiota. Die Enthusiasten, die das Labor etablieren würden, könnten verschiedene Fachbereiche vertreten; das Labor könnte allgemeine und medizinische Mikrobiologen, Neurologen, Gastroenterologen, Diätethiker, Pharmakologen usw. kombinieren.  Nichtsdestoweniger müssten sie alle gemeinsame Interessen haben- diese  wurden von uns oben kurz skizziert.'
                            }},
                        {p: {
                                className: '',
                                text: 'Leider ist es wegen des interdisziplinären Charakters des Netzwerklabor-Themas  kaum möglich, seine Tätigkeit im Rahmen eines existierenden hierarchischen Forschungsinstituts zu organisieren. Solche Forschungsinstitute spezialisieren sich hauptsächlich auf viel engere Problemfelder. Eine dezentralisierte Netzwerkstruktur mit mehreren fachspezialisierten Team-Leaders  bietet sich als natürliche Alternativform für ein solches kreatives Labor an. Es könnte Teams aus verschiedenen Forschungseinrichtungen einschließen. Ein solches anfänglich informelle Labor könnte  Anträge auf Zuschüsse stellen, Konferenzen (auch online-Symposia) organisieren, wissenschaftliche Werke verfassen und Behörden kontaktieren, die für die Realisierung kommerzieller und staatlicher Förderungsinitiativen verantwortlich sein sollen. '
                            }},
                        {p: {
                                className: '',
                                text: 'Interessanterweise ist in Russland eine informelle dezentralisierte Netzwerkstruktur von „Exoten“-Mikiobiologen vor einigen Jahren entstanden, die sich für das Sozialverhalten und die Kommunikation von Mikroorganismen interessieren und deshalb als Vorläufer des geplanten Enthusiasten-Labor  angesehen werden dürfte.'
                            }},
                        {p: {
                                className: 'text_blue',
                                text: 'Konkretisierung der obengenannten Ziele in Bezug auf das Thema WEG ZUM MARS'
                            }},
                        {p: {
                                className: '',
                                text: 'Der seit langem gehegte Traum, zum Mars und anderen Himmelskörpern zu fliegen,  bietet Gelegenheit für die Realisierung von Netzwerk-Prinzipien während der Erarbeitung eines derartigen Prjekts sowie während seiner  Verwirklichung. Der Weltraum  bietet viele Möglichkeiten für innovative international Missionen, die Netzwerkstrukturen kreativ benutzen können. Es ist zu erwarten, dass die Anwendung von dezentralisierten Netzwerkstrukturen auf Raumforschungsprojekte  alle Arten von Konflikten im Weltraum verhindern und die Raumwettrüstung hemmen würde.'
                            }},
                    ]
                }
            }
        },
    },
    activities: {
        tabs: {
            members: 'Mitglieder',
            formsActivities: 'Tätigkeitsformen',
            contacts: 'Kontakte',
            events: 'Ereignisse',
            codex: 'Ethik'
        },
        communityMembers: {
            title: 'Mitglieder',
            userInfoCard: {
                title: 'BENUTZERKARTE',
                article: 'Artikel'
            }
        },
        formsActivities: {
            title: 'Tätigkeitsformen',
            text: [{
                textBlock: 'Die online Publikation von…von neuen Ideen, Texten, Zeitungsausschnitten , Videos und Bildern sowie die Kritik an anderen Bloggern sind die routinisierten/ Aktivitätsfomen, auf die die Mitglieder einer geschlossenen online-Gemeinschaft sich beschränken müssen. Aber nur eine solche online-Gemeinschaft kann unserer Meinung nach  als effizient gelten, die sich auch im wirklichen Leben außerhalb  von Webseiten und –Chats realisieren will!Die Spezifik von dezentralisierten Netzwerken – die im Laufe von vielen Jahrtausenden vor dem Entstehen der modernen digitalen Epoche in Form von hierarchielosen Jäger-Sammler-Gruppen existierten –besteht eben darin, dass sie sich devirtualisieren möchten. Dazu gibt es u. a. folgende Möglichkeiten:',
                list: [
                    'Publikation von praktischen Erfolgen von Netzwerkstrukturen, die sich in irgendeinem Land und in irgendeiner Gesellschaftssphären entwickeln  (die Netzwerke dürften sich z. B. mit dem Schutz von Pinguinen in der Westantarktis oder mit der Sauberkeit von Toiletten in Zimbabwe beschäftigen!) führt dazu, dass andere ähnliche Strukturen  anderswo zu schaffen versuchen',
                    'Anträge an Politiker (Regierungsmitgliedern u. ä) mit dem Ziel, eine netzwerkfördernde politische Atmosphäre zu  schaffen und die Arbeit von Netzwerkentwicklern zu erleichtern (beispielsweise kann es sich um das Netzwerk von frustrierten  Bankkunden handeln); auch in diesem Fall ist ein Resonanzeffekt zu erwarten, der die Entwicklung von Netwerkstrukturen auf lokaler und auch globaler Ebene beschleunigen könnte',
                    'Informationen über Netzwerkstrukturen  in Periodika und Filmen sollte einen bedeutenden Einfluss  auf  die Gehirne und die Herzen von Menschen ausüben',
                    'Zuletzt (unser Haupttraum): die devirualisierte Zusammenarbeit von den Mitgliedern  dieser online-Gemeinschaft  im Rahmen einer beruflichen Tagung oder eines Symposiums/Kongresses oder, noch besser, im Rahmen eines bezuschußten Projekts'
                ]
            }]
        },
        contacts: {
            title: 'KONTAKTE',
        },
        events: {
            title: 'EREIGNISSE',
        },
        codex: {
            title: 'Ethik',
            text: 'Ungeachtet der ziemlich weit verbreiteten Meinung, ist die Wissenschaft nicht neutral in ethischer Hinsicht. Natur- und Sozialwissenschaftler  sind verantwortlich für die Folgen ihrer Tätigkeit; die für die Menschheit sowohl nützlich als auch schädlich sein könnte! Die Netzwerkstrukturen, mit denen unsere Gemeinschaft sich beschäftigt und die eine weit verbreitete Sozialtechnologie darstellen, sind ambivalent in Bezug auf ihren Einfluss auf die Gesellschaft; wegen ihrer potentiellen Effizienz könnten sie auch etwa so gefährlich wie Nuklearwaffen oder Gentechniken sein. Die Gründungsmitglieder und die Anhänger unserer online-Gemeinschaft sind sich dessen bewusst. Auch bei der Entwicklung neuer Netzwerke muss man sich ständig fragen: Ist meine Tätigkeit ethisch gerechtfertigt? Sind diese Netzwerke nicht etwa gefährlich? Anscheinend haben Gläubige einen Vorteil: sie sind sich  der geistigen Aspekte ihrer Tätigkeit bewusst. Letztendlich handelt es sich auch bei der Entwicklung von Netzwerken um die göttliche Vorsehung.  \n' +
            'Es ist in diesem Zusammenhng  von Bedeutung, dass die frühchristliche Kirche eine dezentralisierte Struktur darstellte. Das wurde beispielsweise in Paulus Galaterbrief betont. Jede Religion geht davon aus, dass es wichtige Grenzen gibt, die die Menschen nicht überschreiten dürfen! Im Kontrast dazu lassen sich Atheisten nur von irdischen ethischen Normen leiten; nichtsdestoweniger können unserer Meinung nach auch diese Normen für die Lösung ethischer Probleme behilflich sein,! '
        }
    },
    library: {
        tabs: {
            our_publications: 'Alle Veröffentlichungen'
        }
    },
    articlePublishing: {
        createArticle: {
            title: {
                create: {
                    label: 'Artikel erstellen',
                },
                edit: {
                    label: 'Bearbeiten eines Artikels',
                }
            },
            fullScreen: 'Erweitern Sie den Vollbildmodus',
            collapse: 'Einklappen',
            saveAs: 'Als Entwurf speichern',
            fields: {
                nameArticle: {
                    label: 'Artikeltitel',
                    placeholder: 'Geben Sie den Titel des Artikels ein',
                    required: true
                },
                subject: {
                    label: 'Richtung',
                    placeholder: 'Wählen Sie ein Ziel',
                    required: true,
                    btnLabel: 'Laden Sie das Bild für den Titel herunter'
                },
                annotation: {
                    label: 'Zusammenfassung',
                    required: true
                },
                upLoadFile: 'Bild hochladen',
                changeFile: 'Ändern Sie das Headerbild',
                deleteFile: 'Bild löschen',
                textFile: 'Dieses Bild erscheint neben dem Titel Ihres Artikels',
                textArticle: {
                    label: 'Artikeltext',
                    link: 'Laden Sie die Textdatei herunter'
                },
                keyWords: {
                    label: 'Stichworte',
                    placeholder: 'Geben Sie Schlüsselwörter ein'
                },
                actions: {
                    preview: 'VORSCHAU',
                    closePreview: 'Vorschau schließen',
                    submit: 'Zur Überprüfung einreichen'
                }
            }
        },
        publishing_rules: {
            rules: {
                title: 'Regeln für die Veröffentlichung eines Artikels',
                text: [
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'}
                ]
            },
            aboutModeration: {
                title: 'Über Moderation',
                text: [
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'},
                    {label: 'Die Veröffentlichung sollte nicht gegen die Regeln der Website verstoßen'}
                ]
            }
        }
    },
    infoArticle: {
        moreArticles: 'MEHR ÜBER THEMA',
        comments: {
            title: 'Kommentare',
            allComments: 'ALLE KOMMENTARE',
            placeholder: 'Schreibe deinen Kommentar...',
            collapse: 'EINKLAPPEN KOMMENTARE',
            reply: 'Antwort',
            send: 'Zu senden'
        }
    },
    my_publications: {
        tabs: {
            all_my_publications: 'Alle Veröffentlichungen',
            published: 'Veröffentlicht',
            draft: 'Entwurf',
            review: 'Unveröffentlicht',
            archive: 'Archivieren',
            declined: 'Abgelehnt'
        },
        status: {
            published: 'Veröffentlicht',
            draft: 'Entwurf',
            review: 'Ausstehend',
            archive: 'Im Archiv',
            declined: 'Administrator wurde abgelehnt',

        },
        menu: {
            edit: 'Redigieren',
            delete: 'Löschen'
        }
    },
    administration: {
        tabs: {
            users: 'Benutzer',
            articles: 'Publikationen',
            events: 'Ereignisse',
        },
        table: {
            users: {
                name: {
                    label: 'Name',
                    style: {width: '34%'}
                },
                email: {
                    label: 'E-MAIL',
                    style: {width: '20%'}
                },
                dataRegistration: {
                    label: 'Registrationsdatum',
                    style: {width: '21%'}
                },
                status: {
                    label: 'Status',
                    style: {width: '25%'}
                }
            },
            articles: {
                name: {
                    label: 'Name der Veröffentlichung',
                    style: {width: '34%'},
                    type: 'text'
                },
                subject: {
                    label: 'Richtung',
                    style: {width: '20%'},
                    type: 'text'
                },
                dataCreate: {
                    label: 'Erstellungsdatum',
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
                    label: 'Название события',
                    style: {width: '55%'},
                    type: 'text'
                },
                dateCreate: {
                    label: 'Дата создания',
                    style: {width: '20%'},
                    type: 'text'
                },
                datePublication: {
                    label: 'Дата публикации',
                    style: {width: '20%'},
                    type: 'text'
                }
            }
        },
        notFoundData: {
            users: 'Keine Benutzer',
            articles: 'Keine Veröffentlichungen',
            events: 'Keine Ereignisse'
        },
        status: {
            active: 'Registrierung bestätigt',
            declined: 'Registrierung abgelehnt',
            locked: 'Benutzer ist blockiert',
            deleted: 'Benutzer gelöscht',
            published: 'Veröffentlicht'
        },
        other: {
            requestUser: 'Antrag auf Registrierung',
            requestArticle: 'Antrag auf Veröffentlichung'
        },
        menu: {
            locked: 'Blockieren',
            unlocked: 'Entsperren',
            deleted: 'Löschen'
        },
        buttons: {
            confirm: 'Bestätigen',
            reject: 'Ablehnen',
            deleted: 'Löschen'
        }
    },
    createEvent: {
        title: {
            edit: {
                label: 'Ereignis bearbeiten'
            },
            create: {
                label: 'Veranstaltung erstellen'
            }
        },
        fields: {
            publishDate: {
                label: 'Datum',
            },
            caption: {
                label: 'Titel der Veranstaltung',
                placeholder: 'Geben Sie den Titel der Veranstaltung ein...'
            },
            text: {
                label: 'Ereignistext',
                placeholder: 'Geben Sie den Ereignistext ein...'
            },
            actions: {
                save: 'Speichern',
                cancel: 'Abbrechen'
            }
        }
    },
    footer: {
        home: {
            title: 'ZUHAUSE',
            array: [
                {
                    newArtciles: 'Neue artikel',
                    link: 'new_artciles',
                    tab: ''
                },
                {
                    popularArtciles: 'Beliebte artikel',
                    link: 'popular_artciles',
                    tab: ''
                }
            ]
        },
        about: {
            title: 'GEMEINSCHAFT',
            array: [
                {
                    mission: 'Mission',
                    link: 'about',
                    tab: 'mission'
                },
                {
                    preamble: 'Vorwort',
                    link: 'about',
                    tab: 'preamble'
                },
                {
                    aim: 'Hauptziele',
                    link: 'about',
                    tab: 'aim'
                },
                {
                    specifications: 'Konkretisierung',
                    link: 'about',
                    tab: 'specifications'
                }
            ]
        },
        activities: {
            title: 'TÄTIGKEIT',
            array: [
                {
                    members: 'Mitglieder',
                    link: 'activities',
                    tab: 'members'
                },
                {
                    formsActivities: 'Tätigkeitsformen',
                    link: 'activities',
                    tab: 'formsActivities'
                },
                {
                    contacts: 'Kontakte',
                    link: 'activities',
                    tab: 'contacts'
                },
                {
                    events: 'Ereignisse',
                    link: 'activities',
                    tab: 'events'
                },
                {
                    codex: 'Ethik',
                    link: 'activities',
                    tab: 'codex'
                },
            ]
        },
        library: {
            title: 'BIBLIOTHEK',
            array: [
                {
                    ourPublications: 'Unsere Veröffentlichungen',
                    link: 'library',
                    tab: 'our_publications'
                },
                {
                    OtherPublications: 'Andere Veröffentlichungen',
                    link: 'library',
                    tab: 'other_publications'
                }
            ]
        }
    },
    other: {
        textNoData: 'Keine Veröffentlichungen'
    }
};