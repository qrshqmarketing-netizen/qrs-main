const cleanLabel = (value) => value
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/[*_`]/g, '')
  .replace(/[→←⟶➜]+/g, '')
  .replace(/\s+/g, ' ')
  .trim();

function textFromChildren(children) {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).filter(Boolean).join(' ');
  if (!children || typeof children !== 'object' || !children.props) return '';
  if (typeof children.props.text === 'string') return children.props.text;
  return textFromChildren(children.props.children);
}

function headingFromChildren(children) {
  if (Array.isArray(children)) {
    for (const child of children) {
      const heading = headingFromChildren(child);
      if (heading) return heading;
    }
    return '';
  }
  if (!children || typeof children !== 'object' || !children.props) return '';
  if (typeof children.type === 'string' && /^h[1-6]$/.test(children.type)) return textFromChildren(children.props.children);
  return headingFromChildren(children.props.children);
}

export function labelFromChildren(children) {
  return headingFromChildren(children) || textFromChildren(children);
}

export function interactionTitle({ href, label = '', target, isButton = false, expanded }) {
  const text = cleanLabel(label);
  const lower = text.toLowerCase();
  if (href === '#roof-check' || href?.startsWith('/start/') || /get pro advice|request an estimate|request my estimate/i.test(text)) {
    return 'Click to fill out a request form and tell us about your roofing project.';
  }
  if (/instant quote|see my estimate/i.test(text)) {
    return 'Open the instant quote tool to get an estimated roof replacement price.';
  }
  if (href?.startsWith('tel:') || /^call\b/.test(lower)) {
    return `Call QRS${text ? `: ${text.replace(/^call\s*/i, '')}` : ''}.`;
  }
  if (href?.startsWith('mailto:')) return 'Email the QRS team.';
  if (href?.startsWith('#')) return text ? `Jump to the ${text} section.` : 'Jump to the related section.';
  if (target === '_blank') return text ? `Open ${text} in a new tab.` : 'Open this link in a new tab.';
  if (isButton && expanded !== undefined) {
    const menu = lower.replace(/^(open|close|show)\s+/, '').replace(/\s+menu$/, '') || 'navigation';
    return `Click to ${expanded ? 'close' : 'open'} the ${menu} menu.`;
  }
  if (isButton) {
    if (/^(close|dismiss|hide)$/i.test(text)) return `Click to ${lower} this panel.`;
    if (/^(back|previous slide|next slide)$/i.test(text)) return `Click to show the ${lower} option.`;
    return text ? `Click to ${text.charAt(0).toLowerCase()}${text.slice(1)}.` : 'Click to continue.';
  }
  return text ? `Go to ${text}.` : 'Open this page.';
}
