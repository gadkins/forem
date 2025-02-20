import { h, render } from 'preact';
import { Tags } from '../../display-ad/tags';

Document.prototype.ready = new Promise((resolve) => {
  if (document.readyState !== 'loading') {
    return resolve();
  }
  document.addEventListener('DOMContentLoaded', () => resolve());
  return null;
});

/**
 * A callback that sets the hidden 'js-tags-textfield' with the selection string that was chosen via the
 * MultiSelectAutocomplete component.
 *
 * @param {String} selectionString The selected tags represented as a string (e.g. "webdev, git, career")
 */
function saveTags(selectionString) {
  document.getElementsByClassName('js-tags-textfield')[0].value =
    selectionString;
}

/**
 * Shows and Renders a Tags preact component for the Targeted Tag(s) field
 */
function showTagsField() {
  const displayAdsTargetedTags = document.getElementById(
    'display-ad-targeted-tags',
  );

  if (displayAdsTargetedTags) {
    displayAdsTargetedTags.classList.remove('hidden');
    render(
      <Tags onInput={saveTags} defaultValue={defaultTagValues()} />,
      displayAdsTargetedTags,
    );
  }
}

/**
 * Hides the Targeted Tag(s) field
 */
function hideTagsField() {
  const displayAdsTargetedTags = document.getElementById(
    'display-ad-targeted-tags',
  );

  displayAdsTargetedTags?.classList.add('hidden');
}

/**
 * Clears the content (i.e. value) of the hidden tags textfield
 */
function clearTagList() {
  const hiddenTagsField =
    document.getElementsByClassName('js-tags-textfield')[0];

  hiddenTagsField.value = ' ';
}

/**
 * Returns the value of the hidden text field to eventually pass as
 * default values to the MultiSelectAutocomplete component.
 */
function defaultTagValues() {
  let defaultValue = '';
  const hiddenTagsField =
    document.getElementsByClassName('js-tags-textfield')[0];

  if (hiddenTagsField) {
    defaultValue = hiddenTagsField.value.trim();
  }

  return defaultValue;
}

/**
 * Shows and Renders Exclude Article IDs group
 */
function showExcludeIds() {
  const excludeField = document.getElementsByClassName(
    'js-exclude-ids-textfield',
  )[0].parentElement;
  excludeField?.classList.remove('hidden');
}

/**
 * Hides the Exclude Article IDs group
 */
function hideExcludeIds() {
  const excludeField = document.getElementsByClassName(
    'js-exclude-ids-textfield',
  )[0].parentElement;
  excludeField?.classList.add('hidden');
}

/**
 * Clears the content (i.e. value) of the Exclude Article IDs group
 */
function clearExcludeIds() {
  const excludeField = document.getElementsByClassName(
    'js-exclude-ids-textfield',
  )[0];
  if (excludeField) {
    excludeField.value = '';
  }
}

/**
 * Shows and sets up the Targeted Tag(s) field if the placement area value is "post_comments".
 * Listens for change events on the select placement area dropdown
 * and shows and hides the Targeted Tag(s) appropriately.
 */
document.ready.then(() => {
  const select = document.getElementsByClassName('js-placement-area')[0];
  const articleSpecificPlacement = ['post_comments', 'post_sidebar'];
  if (articleSpecificPlacement.includes(select.value)) {
    showTagsField();
    showExcludeIds();
  }

  select.addEventListener('change', (event) => {
    if (articleSpecificPlacement.includes(event.target.value)) {
      showTagsField();
      showExcludeIds();
    } else {
      hideTagsField();
      clearTagList();

      hideExcludeIds();
      clearExcludeIds();
    }
  });
});
