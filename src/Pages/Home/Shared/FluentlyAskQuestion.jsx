const FluentlyAskQuestion = () => {
  return (
    <div>
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center my-6">
        Frequently Asked Questions
      </h2>

      <div className="join join-vertical w-full">
        {/* Question 1 */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            How can I borrow a book from the library?
          </div>
          <div className="collapse-content">
            <p>
              To borrow a book, simply browse through our collection, select the
              book you want, and click on the &quot;Borrow&quot; button. You will need to
              log in to your account to complete the process.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Can I extend my book borrowing period?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can extend your borrowing period as long as the book is
              not reserved by someone else. Just go to your borrowed books
              section and click on &ldquo;Extend&ldquo; for the book you want to keep
              longer.
            </p>
          </div>
        </div>

        {/* Question 4 */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            What should I do if I lose a borrowed book?
          </div>
          <div className="collapse-content">
            <p>
              If you lose a borrowed book, please contact us immediately to
              report the loss. You may be asked to reimburse the library for the
              cost of replacing the book, depending on the library&apos;s policy.
            </p>
          </div>
        </div>

        {/* Question 5 */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            How can I reserve a book that is currently unavailable?
          </div>
          <div className="collapse-content">
            <p>You can&apos;t reserve a book if it&apos;s unavailable</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluentlyAskQuestion;
