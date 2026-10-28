// Accessible animated heading. `lines` is an array of strings. Wrap words in *asterisks* to emphasise
// them (italic + accent colour), e.g. "a *good meal.*". Screen readers get the plain text once.
export default function SplitHeading({ as: Tag = 'h2', lines, className = '', delay, ...rest }) {
  const list = Array.isArray(lines) ? lines : [lines];
  const plain = list.join(' ').replace(/\*/g, '');

  const renderLine = (line) => {
    let emphasised = false;
    return line.split(' ').map((raw, j) => {
      let word = raw;
      if (word.startsWith('*')) {
        emphasised = true;
        word = word.slice(1);
      }
      const closes = word.endsWith('*');
      if (closes) word = word.slice(0, -1);
      const em = emphasised;
      if (closes) emphasised = false;
      return (
        <span key={j}>
          <span className="sw">
            <span className={`sw-i${em ? ' em' : ''}`}>{word}</span>
          </span>{' '}
        </span>
      );
    });
  };

  return (
    <Tag className={`split ${className}`} data-split data-delay={delay} {...rest}>
      <span className="sr-only">{plain}</span>
      {list.map((line, i) => (
        <span className="split-line" key={i} aria-hidden="true">
          {renderLine(line)}
        </span>
      ))}
    </Tag>
  );
}
