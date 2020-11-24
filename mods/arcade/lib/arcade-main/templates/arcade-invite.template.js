
module.exports = ArcadeInviteTemplate = (app, mod, invite, idx) => {

console.log(JSON.stringify(invite.transaction));

  let inviteTypeClass = "open-invite";
  let game_initialized = 0;
  if (invite.isMine) { inviteTypeClass = "my-invite"; }
  if (invite.msg) {
    if (invite.msg.options['game-wizard-players-select'] == invite.msg.players.length) {
      game_initialized = 1;
    }
  }

  let playersHtml = `<div class="playerInfo" style="grid-template-columns: repeat(${invite.msg.players_needed}, 1fr);">`;
  for (let i = 0; i < invite.msg.players_needed; i++) {
    if (i < 4) {
      if (i < invite.msg.players.length) {
        let identicon = app.keys.returnIdenticon(invite.msg.players[i]);
        playersHtml += `<div class="player-slot tip"><img class="identicon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MjAnIGhlaWdodD0nNDIwJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0MCwyNDAsMjQwLDEpOyc+PGcgc3R5bGU9J2ZpbGw6cmdiYSgzOCwyMTcsMTk5LDEpOyBzdHJva2U6cmdiYSgzOCwyMTcsMTk5LDEpOyBzdHJva2Utd2lkdGg6Mi4xOyc+PHJlY3QgIHg9JzE2OCcgeT0nMTY4JyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nODQnIHk9JzI1Micgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzI1MicgeT0nMjUyJyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nODQnIHk9JzMzNicgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzI1MicgeT0nMzM2JyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nMCcgeT0nMCcgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzMzNicgeT0nMCcgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzAnIHk9Jzg0JyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nMzM2JyB5PSc4NCcgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzAnIHk9JzE2OCcgd2lkdGg9Jzg0JyBoZWlnaHQ9Jzg0Jy8+PHJlY3QgIHg9JzMzNicgeT0nMTY4JyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nMCcgeT0nMjUyJyB3aWR0aD0nODQnIGhlaWdodD0nODQnLz48cmVjdCAgeD0nMzM2JyB5PScyNTInIHdpZHRoPSc4NCcgaGVpZ2h0PSc4NCcvPjwvZz48L3N2Zz4="><div class="tiptext">NameOrIdentifier@saito</div></div>`;
      } else {
        playersHtml += `<div class="player-slot identicon-empty"></div>`;  
      }
    } else {
      playersHtml += `<div style="color:#f5f5f59c;margin-left:0.2em;" class="player-slot-ellipsis fas fa-ellipsis-h"></div>`;  
      break;
    }
  }
  playersHtml += '</div>';

  let inviteHtml = `
    <div id="invite-${invite.transaction.sig}" class="arcade-tile i_${idx} ${inviteTypeClass}" style="background-image: url(/${invite.msg.game}/img/arcade.jpg);">
      <div class="invite-tile-wrapper">
        <div class="game-inset-img" style="background-image: url(/${invite.msg.game}/img/arcade.jpg);"></div>
        <div class="invite-row-2">
          <div class="gameName">${invite.msg.game}</div>
          ${playersHtml}
        </div>
        <div class="gameShortDescription">${makeDescription(app, invite)}</div>
	<div class="gameButtons">
    `;
     if (invite.isMine) {
       if (game_initialized == 1) { 
         inviteHtml += `<button data-sig="${invite.transaction.sig}" data-cmd="continue" class="button invite-tile-button">CONTINUE</button>`;
       }
       inviteHtml += `<button data-sig="${invite.transaction.sig}" data-cmd="cancel" class="button invite-tile-button">CANCEL</button>`;
     } else {
       inviteHtml += `<button data-sig="${invite.transaction.sig}" data-cmd="join" class="button invite-tile-button">JOIN</button>`;
     }

  inviteHtml += `
        </div>
      </div>
    </div>
    `;

  return inviteHtml;
}



let makeDescription = (app, invite) => {
  let defaultDescription = "";
  let gameModule = app.modules.returnModule(invite.msg.game);
  if (gameModule) {
    let moduleDescriptionMaker = gameModule.requestInterface("make-invite-description");  
    if (moduleDescriptionMaker) {
      defaultDescription = moduleDescriptionMaker.makeDescription(invite.msg);
      if (defaultDescription === undefined) { defaultDescription = ""; }
    }
  }
  if (defaultDescription == "") { return ""; }
  if (invite.msg) {
    if (invite.msg.description) {
      defaultDescription = invite.msg.description;
    }
  }
  return ('<div class="invite-description">'+defaultDescription+'</div>');
}