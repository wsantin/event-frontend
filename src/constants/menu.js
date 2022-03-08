/*
 * icon: https://themekit.dev/docs/code/iconsmind/
 */
const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "Dashboard",
    to: "/app/dashboards",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "General",
        to: "/app/dashboards/general",
      },
      {
        icon: "simple-icon-pie-chart",
        label: "ventas",
        to: "/app/dashboards/ventas",
      },
      {
        icon: "simple-icon-basket-loaded",
        label: "Calificaciones",
        to: "/app/dashboards/calificaciones",
      },
      {
        icon: "simple-icon-doc",
        label: "trabajadores",
        to: "/app/dashboards/trabajadores",
      },
    ],
  },

  {
    id: "ventas",
    icon: "iconsminds-pantone",
    label: "Ventas",
    to: "/app/ventas",
    subs: [
      {
        id: "ventas-sucursales",
        label: "Sucursales",
        to: "/app/ventas/sucursales",
        subs: [
          {
            icon: "simple-icon-notebook",
            label: "Punto de ventas",
            to: "/app/ventas/sucursales/punto-ventas",
          },
        ],
      },
      {
        id: "ventas-ordenes",
        label: "Ordenes",
        to: "/app/ordenes",
        subs: [
          {
            icon: "simple-icon-puzzle",
            label: "Ventas",
            to: "/app/ordenes/ventas",
          },
          {
            icon: "simple-icon-puzzle",
            label: "Cotizaciones",
            to: "/app/ordenes/cotizaciones",
          },
        ],
      },
    ],
  },
  // {
  //   id: "marketing",
  //   icon: "iconsminds-pantone",
  //   label: "Marketing",
  //   to: "/app/marketing",
  //   subs: [
  //     {
  //       id: "marketing-envio-mensajes",
  //       label: "Envios de Mensajes",
  //       to: "/app/marketing/envio-mensajes",
  //       subs: [
  //         {
  //           icon: "simple-icon-notebook",
  //           label: "Envio Mensaje",
  //           to: "/app/marketing/envio-mensajes/envio-mensajes"
  //         },
  //         {
  //           icon: "simple-icon-notebook",
  //           label: "Envio Correo",
  //           to: "/app/marketing/envio-mensajes/correo"
  //         }
  //       ]
  //     },
  //     {
  //       id: "marketing-social",
  //       label: "Social",
  //       to: "/app/social",
  //       subs: [
  //         {
  //           icon: "simple-icon-puzzle",
  //           label: "Facebook",
  //           to: "/app/social/facebbok"
  //         },
  //         {
  //           icon: "simple-icon-puzzle",
  //           label: "Instagram",
  //           to: "/app/social/instagram"
  //         },
  //       ]
  //     }
  //   ]
  // },
  {
    id: "productos",
    icon: "iconsminds-cookies",
    label: "Productos Servicios",
    to: "/app/products/services/todos",
  },
  {
    id: "inventarios",
    icon: "iconsminds-pantone",
    label: "Inventarios",
    to: "/app/inventarios",
    subs: [
      {
        id: "marketing-envio-mensajes",
        label: "Inventario",
        to: "/app/inventarios/compras",
        subs: [
          {
            icon: "simple-icon-notebook",
            label: "Movimientos",
            to: "/app/inventarios/compras",
          },
        ],
      },
      {
        id: "marketing-social",
        label: "Kardex",
        to: "/app/Inventario",
        subs: [
          {
            icon: "simple-icon-puzzle",
            label: "Kardex",
            to: "/app/Inventario/kardex",
          },
        ],
      },
    ],
  },
  {
    id: "agentes",
    icon: "iconsminds-pantone",
    label: "Clientes Proovedores",
    to: "/app/agentes/clientes",
    // subs: [
    //   {
    //     id: "marketing-envio-mensajes",
    //     label: "Mis agentes",
    //     to: "/app/agentes/mis-agentes",
    //     subs: [
    //       {
    //         icon: "simple-icon-notebook",
    //         label: "Socios Comerciales",
    //         to: "/app/agentes/mis-agentes/socios-comerciales",
    //       },
    //       {
    //         icon: "simple-icon-notebook",
    //         label: "Trabajadores",
    //         to: "/app/agentes/mis-agentes/trabajadores",
    //       },
    //       {
    //         icon: "simple-icon-notebook",
    //         label: "Proovedores",
    //         to: "/app/agentes/mis-agentes/proovedores",
    //       },
    //     ]
    //   },
    //   {
    //     id: "marketing-envio-mensajes",
    //     label: "accesos",
    //     to: "/app/accesos",
    //     subs: [
    //       {
    //         icon: "simple-icon-notebook",
    //         label: "Usuarios",
    //         to: "/app/accesos/usuarios"
    //       },
    //     ]
    //   }
    // ]
  },
  // {
  //   id: "eventos",
  //   icon: "iconsminds-pantone",
  //   label: "eventos",
  //   to: "/app/eventos",
  //   subs: [
  //     {
  //       id: "eventos-calendario",
  //       label: "calendario",
  //       to: "/app/eventos/calendario",
  //       subs: [
  //         {
  //           icon: "simple-icon-notebook",
  //           label: "Fechas festivos",
  //           to: "/app/eventos/calendario/festivos"
  //         },
  //         {
  //           icon: "simple-icon-notebook",
  //           label: "Notas",
  //           to: "/app/eventos/calendario/notas"
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    id: "configuraciones",
    icon: "iconsminds-pantone",
    label: "Configuraciones",
    to: "/app/configuraciones",
    // subs: [
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Temas Web",
    //     to: "/app/configuraciones/temas",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Categorias",
    //     to: "/app/configuraciones/categorias",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Nivel clientes",
    //     to: "/app/configuraciones/nivel-clientes",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Tipo Productos",
    //     to: "/app/configuraciones/tipo-productos",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Tipo Pago",
    //     to: "/app/configuraciones/tipo-pagos",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Ordenes Estados",
    //     to: "/app/configuraciones/ordenes-estado",
    //   },
    //   {
    //     icon: "simple-icon-arrow-right",
    //     label: "Zonas",
    //     to: "/app/configuraciones/zonas",
    //   },
    // ]
  },
];
export default data;
