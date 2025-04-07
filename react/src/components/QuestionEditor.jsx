import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from '../contexts/ContextProvider';

export default function QuestionEditor({ index = 0, question, addQuestion, deleteQuestion, questionChange }) {
    {console.log("QuestionEditor", question.data.options)}

    const [model, setModel] = useState({ ...question });
    const { questionTypes } = useStateContext();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ['select', 'radio', 'checkbox'].includes(type);
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value,
        };
        if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
            if (!model.data.options) {
                newModel.data = {
                    options: [{ uuid: uuidv4(), text: '' }],
                };
            }
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: '',
        });
        setModel({ ...model });
    }

    function deleteOption(op) {
        model.data.options = model.data.options.filter((option) => option.uuid != op.uuid);
        setModel({ ...model });
    }

    return (
        <>
            <div>
                <div className="mb-3 flex justify-between">
                    <h4>
                        {index + 1}. {model.question}
                    </h4>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="mr-2 flex items-center rounded-sm bg-gray-600 px-3 py-1 text-xs text-white hover:bg-gray-700"
                            onClick={() => addQuestion(index + 1)}
                        >
                            <PlusIcon className="w-4" />
                            add
                        </button>
                        <button
                            type="button"
                            className="flex items-center rounded-sm border border-transparent px-3 py-1 text-xs font-semibold text-red-500 hover:border-red-600"
                            onClick={() => deleteQuestion(question)}
                        >
                            <TrashIcon className="w-4" />
                            Delete
                        </button>
                    </div>
                </div>
                <div className="mb-3 flex justify-between gap-3">
                    {/* Question Text */}
                    <div className="flex-1">
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                            Question
                        </label>
                        <input
                            type="text"
                            name="question"
                            id="question"
                            value={model.question}
                            onChange={(ev) => setModel({ ...model, question: ev.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Question Text */}

                    {/* Question Type */}
                    <div>
                        <label htmlFor="questionType" className="block w-40 text-sm font-medium text-gray-700">
                            Question Type
                        </label>
                        <select
                            id="questionType"
                            name="questionType"
                            value={model.type}
                            onChange={onTypeChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                        >
                            {questionTypes.map((type) => (
                                <option value={type} key={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Question Type */}
                </div>

                {/*Description*/}
                <div className="mb-3">
                    <label htmlFor="questionDescription" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="questionDescription"
                        id="questionDescription"
                        value={model.description || ''}
                        onChange={(ev) => setModel({ ...model, description: ev.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                {/*Description*/}

                <div>
                    {shouldHaveOptions() && (
                        <div>
                            <h4 className="mb-1 flex items-center justify-between text-sm font-semibold">
                                Options
                                <button
                                    onClick={addOption}
                                    type="button"
                                    className="flex items-center rounded-sm bg-gray-600 px-2 py-1 text-xs text-white hover:bg-gray-700"
                                >
                                    Add
                                </button>
                            </h4>
                            {console.log('model', JSON.stringify(model, null, 2))}
                            {console.log('model.data', JSON.stringify(model.data, null, 2))}
                            {console.log('model.data.options', JSON.stringify(model.data.options, null, 2))}
                            {model.data.options.length === 0 && (
                                <div className="py-3 text-center text-xs text-gray-600">You don't have any options defined</div>
                            )}
                            {model.data.options.length > 0 && (
                                <div>
                                    {model.data.options.map((op, ind) => (
                                        <div key={op.uuid} className="mb-1 flex items-center">
                                            <span className="w-6 text-sm">{ind + 1}.</span>
                                            <input
                                                type="text"
                                                value={op.text}
                                                onInput={(ev) => {
                                                    op.text = ev.target.value;
                                                    setModel({ ...model });
                                                }}
                                                className="w-full rounded-sm border border-gray-300 px-2 py-1 text-xs focus:border-indigo-500"
                                            />
                                            <button
                                                onClick={(ev) => deleteOption(op)}
                                                type="button"
                                                className="flex h-6 w-6 items-center justify-center rounded-full border border-transparent transition-colors hover:border-red-100"
                                            >
                                                <TrashIcon className="h-3 w-3 text-red-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {model.type === 'select' && <div></div>}
            </div>
            <hr />
        </>
    );
}
