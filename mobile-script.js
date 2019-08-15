function h(str, props = {}, children = []) {
    const elName = str.split('.')[0];
    const className = str.split('.').slice(1).join(' ') + (props.className || '')
    const el = document.createElement(elName);
    for (const [attr, val] of Object.entries(props.attrs || {})) {
        el.setAttribute(attr, val);
    }
    Object.assign(el, props)
    el.className = className;

    el.append(...children)
    return el
}

(async () => {

    const style = document.createElement('style')
    style.innerText = `


    .qFrame {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        z-index: 999;
        pointer-events: none;
    }
    
    .qFrame .page {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: inline-block;
        background: white;
        padding: 5%;
        pointer-events: initial;
    }
    
    .qFrame .editor-page {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        z-index: 999;
    }
    
    .qFrame .editor-page .header {
        height: 50px;
        width: 100%;
        background: white;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: initial;
    }
    
    .editor-page .header button {
        float: right;
    }
    
    .qFrame .editor-page .footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        overflow-x: scroll;
        white-space: nowrap;
        pointer-events: initial;
    }
    
    .qFrame .editor-page .footer .ref-card {
        border: 2px solid red;
        box-sizing: border-box;
        padding: 5px;
        margin: 5%;
        width: 70%;
        background: rgba(50, 20, 20, 0.3);
        display: inline-block;
        white-space: pre-line;
    }


    `


    const articleTitle = document.querySelector('.ve-init-mw-mobileArticleTarget-title').textContent



    const qFrame = h('div.qFrame')

    document.body.appendChild(qFrame)
    document.body.appendChild(style)


    function setData(data) {
        console.info(`SetData:`, data);
        const renderer = ({
            class: classPage,
            structure: structurePage,
            loadReferences: loadingReferencesPage,
            editor: editorPage
        })[data.page];
        renderPage(data, renderer);
    }

    async function editorPage(data) {
        const section = data.references[data.editorIndex];

        const veData = data.veData[data.editorIndex];

        const model = ve.init.target.getSurface().getModel()
        model.selectLastContentOffset()
        const lastContentOffset = model.selection.range.to
        let surfaceFragment = model.getLinearFragment(new ve.Range(1, lastContentOffset));
        surfaceFragment.insertContent(veData).collapseToEnd().select();


        return h('div.editor-page', {}, [
            h('style', {}, [
                `
                .editor-overlay, .overlay-header-container {
                    top:50px;
                }
                `
            ]),
            h('div.header', {}, [
                h('span', {}, section.heading),
                h('button.button.mw-ui-button', {
                    onclick: () => {
                        if (data.editorIndex === data.veData.length - 1) {
                            qFrame.remove()
                            const veData = data.veData.flat();
                            const model = ve.init.target.getSurface().getModel()
                            model.selectLastContentOffset()
                            const lastContentOffset = model.selection.range.to
                            let surfaceFragment = model.getLinearFragment(new ve.Range(1, lastContentOffset));
                            surfaceFragment.insertContent(veData).collapseToEnd().select();
                            ve.init.target.getSurface().getView().focus();
                        } else {
                            const model = ve.init.target.getSurface().getModel()
                            let surfaceFragment = model.getLinearFragment(new ve.Range(0, 100000));
                            ve.init.target.getSurface().getView().focus();

                            const existingVeData = surfaceFragment.getData()
                            data.veData[data.editorIndex] = existingVeData;
                            setData({
                                ...data,
                                veData: data.veData,
                                editorIndex: data.editorIndex + 1
                            });
                        }
                    }
                }, [data.editorIndex === data.veData.length - 1 ? 'done' : '->']),
                h('button.button.mw-ui-button', {
                    disabled: data.editorIndex === 0,
                    onclick() {
                        const model = ve.init.target.getSurface().getModel()
                        let surfaceFragment = model.getLinearFragment(new ve.Range(0, 100000));
                        ve.init.target.getSurface().getView().focus();

                        const existingVeData = surfaceFragment.getData()
                        data.veData[data.editorIndex] = existingVeData;
                        setData({
                            ...data,
                            veData: data.veData,
                            editorIndex: data.editorIndex - 1
                        })
                    }
                }, ['<-']),
            ]),
            h('div.footer', {}, [
                ...section.references.map(r => {
                    return h('div.ref-card', {
                        onclick(){
                            const model = ve.init.target.getSurface().getModel()
                            const fragment = model.getFragment();
                            fragment.insertContent([r.url]);
                        }
                    }, [
                        r.title,
                        h('br'),
                        r.url,
                    ])
                })
            ])
        ]);
    }


    // async function referencesPage(data) {

    //     const headingGroups = data.references.flatMap(({ heading, references }, hI) => {

    //         const checkboxes = references.flatMap((heading, i) => {
    //             const row = h('div', {}, [
    //                 h('input', {
    //                     type: 'checkbox',
    //                     checked: true,
    //                     name: `reference_${hI}`,
    //                     id: `reference_${hI}_${i}`
    //                 }),
    //                 h('label', {
    //                     attrs: {
    //                         for: `reference_${hI}_${i}`
    //                     }
    //                 }, [heading.title])
    //             ]);
    //             return row
    //         });
    //         return [h('h3', {}, [heading]), ...checkboxes];
    //     });


    //     const doneButton = h('button.mw-ui-button.button', {
    //         onclick: function () {

    //             const selectedReferences = data.references
    //                 .reduce((acc, { heading, references }, hI) => {
    //                     const checkboxes = Array.from(document.querySelectorAll(`input[name=reference_${hI}]`));
    //                     const filteredReferences = checkboxes.filter(a => a.checked).map(c => {
    //                         const [_, _hI, refI] = c.id.split('_');
    //                         return references[refI];
    //                     });
    //                     return {
    //                         ...acc,
    //                         [heading]: filteredReferences
    //                     };
    //                 }, {});

    //             const veContent = Object.entries(selectedReferences)
    //                 .flatMap(([heading, references]) => {
    //                     return [
    //                         {
    //                             type: 'mwHeading',
    //                             attributes: {
    //                                 level: 2
    //                             }
    //                         },
    //                         heading,
    //                         {
    //                             type: '/mwHeading'
    //                         },
    //                         {
    //                             type: 'paragraph'
    //                         },
    //                         ...references.map(r => "\n - " + r.url),
    //                         {
    //                             type: '/paragraph'
    //                         }
    //                     ];
    //                 });

    //             var surfaceFragment = ve.init.target.getSurface().getModel().getLinearFragment(new ve.Range(0));
    //             surfaceFragment.insertContent(veContent).collapseToEnd().select();
    //             ve.init.target.getSurface().getView().focus();

    //             qFrame.remove()
    //         }
    //     }, ['Next'])

    //     return [
    //         h('h2', {}, ['References']),
    //         ...headingGroups,
    //         doneButton,
    //     ]
    // }


    async function loadingReferencesPage(data) {

        Promise.all(
            data.headings.map(async (heading) => {
                const references = await getJSON(`https://scribe-mediawiki.herokuapp.com/references/Kreuzberg/${heading}`);
                return { heading, references };
            })
        ).then((...headingPairs) => {
            const references = Object.assign(...headingPairs);

            const veData = references.map(({ heading, references }) => {
                return [
                    {
                        type: 'mwHeading',
                        attributes: {
                            level: 2
                        }
                    },
                    heading,
                    {
                        type: '/mwHeading'
                    },
                    {
                        type: 'paragraph'
                    },
                    {
                        type: '/paragraph'
                    }
                ];
            });
            setData({
                ...data,
                references,
                editorIndex: 0,
                veData,
                page: 'editor'
            });
        });

        return h('div.page', {}, [
            h('h2', {}, ['Loading...'])
        ])
    }

    async function structurePage(data) {

        const headings = await getJSON(`https://scribe-mediawiki.herokuapp.com/articleTemplate/${data.class.id}`);

        const headingCheckboxes = headings.map(heading => {
            const row = h('div', {}, [
                h('input', {
                    type: 'checkbox',
                    checked: true,
                    name: 'checkbox_' + heading.anchor,
                    id: 'checkbox_' + heading.anchor,
                }),
                h('label', {
                    attrs: {
                        for: 'checkbox_' + heading.anchor,
                    }
                }, heading.line)
            ]);

            return row
        });

        const doneButton = h('button.mw-ui-button.button', {
            onclick: function () {
                const inputs = Array.from(document.querySelectorAll('.qFrame .page input'));
                const headings = inputs.filter(i => i.checked).map(i => i.id.replace('checkbox_', ''));
                setData({
                    ...data,
                    page: 'loadReferences',
                    headings,
                })
            }
        }, ['Next'])

        return h('div.page', {}, [
            h('h2', {}, ['Structure']),
            ...headingCheckboxes,
            doneButton,
        ])
    }

    async function classPage(data) {
        const classes = await getJSON(`https://scribe-mediawiki.herokuapp.com/classes/${articleTitle}`)

        const classSelection = classes.map(({ id, label }) => {
            const button = h('button.mw-ui-button.button', {
                onclick: () => {
                    setData({
                        ...data,
                        class: { id, label },
                        page: 'structure'
                    })
                }
            }, [label])
            return button;
        });

        return h('div.page', {}, [
            h('h2', {}, ['Class']),
            ...classSelection
        ]);
    }

    async function renderPage(data, pageRenderer) {
        const page = await pageRenderer(data);
        qFrame.childNodes.forEach(n => n.remove());
        qFrame.appendChild(page);
    }

    setData({
        page: 'class'
    })

})()

function getJSON(url) {
    return fetch(url).then(a => a.json());
}