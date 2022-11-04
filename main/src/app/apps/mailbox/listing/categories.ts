export interface Category {

  id: number;

  name: string;

  icon: string;

  count: number;

  color?: string;

  active: boolean;

}



export const mailbox = [

  {

    id: 1,

    name: 'Bandeja de entrada',

    icon: 'mail_outline',

    count: 0,

    active: true,

  },

  {

    id: 2,

    name: 'Bandeja de salida',

    icon: 'send',

    count: 0,

    active: false,

  },

  

  {

    id: 3,

    name: 'Spam',

    icon: 'send',

    count: 0,

    active: false,

  },

 

  {

    id: 5,

    name: 'Eliminados',

    icon: 'delete',

    count: 0,

    active: false,

  },

];







