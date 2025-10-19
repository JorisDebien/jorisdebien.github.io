// Small progressive enhancement for collapsing older experience items.
// Keeps content visible without JS. Fixed selectors and duplicate-chev issue.
(function(){
  const MAX_VISIBLE = 4; // show latest 4 roles by default when JS is enabled
  const STORAGE_KEY = 'resume:experience:expanded';

  // mark JS enabled for CSS hooks
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', () => {
    const collapsible = document.getElementById('older-roles');
    if (!collapsible) return;

    // collect all role items in document order and sort by data-index
    const roles = Array.from(document.querySelectorAll('.role'))
      .filter(el => typeof el.dataset.index !== 'undefined')
      .sort((a,b) => Number(a.dataset.index) - Number(b.dataset.index));

    const hiddenItems = roles.filter(r => Number(r.dataset.index) >= MAX_VISIBLE);
    if (hiddenItems.length === 0){
      // nothing to collapse — hide control if present
      const btn = document.querySelector('.collapse-toggle');
      if (btn) btn.style.display = 'none';
      return;
    }

    // initially collapse depending on persisted preference (default: collapsed)
    const persisted = (function(){
      try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch(e){ return false }
    })();

    const toggleButton = document.querySelector('.collapse-toggle');
    if (!toggleButton) return;

    // initialize aria state based on persisted value (persisted=true => expanded)
    const initiallyExpanded = !!persisted;
    setToggleLabel(initiallyExpanded, hiddenItems.length);
    toggleButton.setAttribute('aria-expanded', String(initiallyExpanded));

    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      // toggle: if currently expanded -> collapse, otherwise expand
      setCollapsed(!expanded);
      try { localStorage.setItem(STORAGE_KEY, String(!expanded)) } catch(e){}
    });

    // perform initial collapsed state (default: collapsed when no persisted true)
    setCollapsed(!initiallyExpanded);

    function setCollapsed(collapse){
      if (collapse){
        // hide older items (use hidden attribute to keep out of flow)
        hiddenItems.forEach(i => {
          i.hidden = true;
        });
        collapsible.classList.add('is-collapsed');
        collapsible.setAttribute('aria-hidden','true');
        setToggleLabel(false, hiddenItems.length);
        toggleButton.setAttribute('aria-expanded','false');
      } else {
        hiddenItems.forEach(i => {
          i.hidden = false;
        });
        collapsible.classList.remove('is-collapsed');
        collapsible.setAttribute('aria-hidden','false');
        setToggleLabel(true, hiddenItems.length);
        toggleButton.setAttribute('aria-expanded','true');
        // move focus into first revealed item for keyboard users (optional)
        const first = hiddenItems[0];
        if (first) first.querySelector('h3, a, button, [tabindex]')?.focus();
      }
    }

    function setToggleLabel(expanded, count){
      // reset text then append a single chevron element
      const label = expanded ? 'Show less' : `Show ${count} more`;
      toggleButton.textContent = label;
      const chev = document.createElement('span');
      chev.className = 'chev';
      chev.setAttribute('aria-hidden','true');
      chev.textContent = '▾';
      toggleButton.appendChild(chev);
    }
  });
})();