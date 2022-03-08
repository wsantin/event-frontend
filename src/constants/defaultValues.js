// HOST AND JWT:
export const JWT_PREFIX = process.env.REACT_APP_JWT_PREFIX || "DC";
export const HOST_API = process.env.REACT_APP_HOST_API || "http://localhost:7000";


export const DRAWERWIDTH = 280;

export const COLOR_STATUS_USER_OBJ = {
  "code": '#ced4da',
  "pending": '#FAA916',
  "change_password": '#28a745',
  "aproved": '#28a745',
  "desactivate": '#FAA916',
  "desactivate_bot": '#28a745'
}


export const COLOR_STATUS_MESSAGE_OBJ = {
  "schedule": '#ced4da',
  "create": '#FAA916',
  "in_process": '#FAA916',
  "in_process": '#FAA916',
  "some_not_sent": '#28a745',
  "all_sent": '#28a745',
  "sent": '#28a745',
  "failed": '#cb1b16',
  "error": '#cb1b16',
  'canceled': '#F3F6F9'
}

export const COLOR_STATUS_MESSAGE = (status) => {
  let color = 'black'
  let background = ''
  let title = ''
  switch(status) {
    case 'schedule':
      background = COLOR_STATUS_MESSAGE_OBJ["schedule"]
      title = 'Queue'
      break;
    case 'create':
      background= COLOR_STATUS_MESSAGE_OBJ["create"]
      title = 'In progress'
      break;
    case 'in_process':
      background = COLOR_STATUS_MESSAGE_OBJ["in_process"]
      title = 'In progress'
      break;
    case 'some_not_sent':
      background = COLOR_STATUS_MESSAGE_OBJ["some_not_sent"]
      title = 'Success Sent Some'
      break;
    case 'all_sent':
      background  = COLOR_STATUS_MESSAGE_OBJ["all_sent"]
      title = 'Success All'
      break;
    case 'sent':
      background  = COLOR_STATUS_MESSAGE_OBJ["sent"]
      title = 'Success'
      break;
    case 'failed':
      background = COLOR_STATUS_MESSAGE_OBJ["failed"]
      title = 'Failed'
      break;
    case 'error':
      background  = COLOR_STATUS_MESSAGE_OBJ["error"]
      title = 'Error'
      break;
    case 'canceled':
      background  = COLOR_STATUS_MESSAGE_OBJ["canceled"]
      title = 'Canceled'
      break;
    // default:
    //   // code block
  }

  return {
    color,
    background,
    title
  }

};

export const COLOR_STATUS_USER = (status) => {
  let color = 'black'
  let background = ''
  let title = ''
  switch(status) {
    case 'code':
      background = COLOR_STATUS_MESSAGE_OBJ["code"]
      title = 'Code'
      break;
    case 'pending':
      background= COLOR_STATUS_MESSAGE_OBJ["pending"]
      title = 'Pendiente'
      break;
    case 'change_password':
      background = COLOR_STATUS_MESSAGE_OBJ["change_password"]
      title = 'Change password'
      break;
    case 'aproved':
      background = COLOR_STATUS_MESSAGE_OBJ["aproved"]
      title = 'Aproved'
      break;
    case 'desactivate':
      background  = COLOR_STATUS_MESSAGE_OBJ["desactivate"]
      title = 'Desactivate'
      break;
    case 'desactivate_bot':
      background  = COLOR_STATUS_MESSAGE_OBJ["desactivate_bot"]
      title = 'Desactivate Bot'
      break;
  }

  return {
    color,
    background,
    title
  }

};
/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-sub-hidden";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;



export const type_route = "history"; // history || hashrouter
