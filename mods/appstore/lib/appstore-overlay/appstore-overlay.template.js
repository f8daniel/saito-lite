module.exports = AppStoreAppspaceTemplate = (app, row) => {

  return `
  
<div class="appstore-overlay-container">

  <div class="appstore-header-featured grid-2" style="grid-template-columns: 1fr auto;">
    <div class="appstore-header-title">Install Applications:</div>
    <div class="searchbox appstore-overlay-searchbox">
        <input type="text" class="appstore-search-box" placeholder="search for apps..." id="appstore-search-box">
    </div>
  </div>

  <div class="appstore-overlay-grid" id="appstore-overlay-grid">
  </div>

  <fieldset class="appstore-overlay-developers">
    <p>
      Developer? Code and upload your first Saito Application in five minutes.
    </p>
  </fieldset>

</div>

  `;
}