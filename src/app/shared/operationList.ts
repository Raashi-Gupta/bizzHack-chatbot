export const  operationList = [
  { name: 'Production', value: 'Production', color: '#00CFE8', icon: 'pi-cog',redirect:"/chat/production" },
  { name: 'Maintenance', value: 'Maintenance', color: '#FF9F43', icon: 'pi-wrench',redirect:"/chat/maintenance" },
  { name: 'Procurement', value: 'Procurement', color: '#9C27B0', icon: 'pi-warehouse',redirect:"chat/procurement" },
  { name: 'Safety', value: 'Safety', color: '#607D8B', icon: 'pi-safety',redirect:"chat/safety" },
];

export const businessList = [
   {id:"B1", name: 'Business1', value: 'Sekurit', color: '#00CFE8', icon: 'pi-car',redirect:"/chat" },
   {id:"B2", name: 'Business2', value: 'Gyproc', color: '#FF9F43', icon: 'pi-building',redirect:"/chat" },
   {id:"B3", name: 'Business3', value: 'Abrasives', color: '#9C27B0', icon: 'pi-briefcase',redirect:"/chat" },
   {id:"B4", name: 'Business4', value: 'Adhesives', color: '#607D8B', icon: 'pi-twitch',redirect:"/chat" },
]

export function getAccessibleBusinesses(): any[] {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return businessList.filter(biz => user.business?.includes(biz.id));
}