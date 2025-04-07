export default function PublicQuestionView({ question, index, answerChanged }) {
    let selectedOptions = [];
    console.log('PublicQuestionView',question);

    function onCheckboxChange(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.text);
        } else {
            selectedOptions = selectedOptions.filter((op) => op != option.text);
        }
        answerChanged(selectedOptions);
    }

    return (
        <>
            <fieldset className="mb-4">
                <div>
                    <legend className="text-base font-medium text-gray-900">
                        {index + 1}. {question.question}
                    </legend>
                    <p className="text-sm text-gray-500">{question.description}</p>
                </div>

                <div className="mt-3">
                    {question.type === 'select' && (
                        <div>
                            <select
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                            >
                                <option value="">Please Select</option>
                                {question.data.options.map((option) => (
                                    <option key={option.uuid} value={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {question.type === 'radio' && (
                        <div>
                            {question.data.options.map((option) => (
                                <div key={option.uuid} className="flex items-center">
                                    <input
                                        id={option.uuid}
                                        name={'question' + question.id}
                                        value={option.text}
                                        onChange={(ev) => answerChanged(ev.target.value)}
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700">
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'checkbox' && (
                        <div>
                            {question.data.options.map((option, ind) => (
                                <div key={option.uuid} className="flex items-center">
                                    <input
                                        id={option.uuid}
                                        onChange={(ev) => onCheckboxChange(option, ev)}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700">
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {question.type === 'text' && (
                        <div>
                            <input
                                type="text"
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}
                    {question.type === 'textarea' && (
                        <div>
                            <textarea
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            ></textarea>
                        </div>
                    )}
                </div>
            </fieldset>
            <hr className="mb-4" />
        </>
    );
}
