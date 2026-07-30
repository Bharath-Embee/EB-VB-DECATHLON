import React, { useState, useEffect, useMemo, useCallback } from 'react';
const LOGO_DATA_URI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCACgAKADASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAQQHAwL/xABHEAABAwMCAgYGBgcECwEAAAABAgMEAAURBhIhMQcTQVFhgRQWVXGRsRUiMkKhwSM2UnSSk9FicpTCFyQlJzM0Y3ODsrPh/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBQEEBv/EACwRAAICAQMCAgsBAQAAAAAAAAECAAMRBBIxEyFBURQiYXGBkaHB0eHwMkL/2gAMAwEAAhEDEQA/AOx5NMmsUpEzk0yaxSkTOT30ye+sUpEzk99MnvrFKRM5PfTJ76xSkTOT30yaxSkTOT30ye+sUpEzk99MnvrFKRM5PfTJ76xSkTOT30yaxSkRSlKRFKUpEUpWFrS2grWoJSkZJJwAKRM0qKgaoslzmCJDuLTz5zhABG7HPBI41K11lKnBGJFWDDIOYpWq5dbcy4pt2fFbWk4UlTyQQfEZr1jzI0sKMaSy+E8FFpwKx78UweZ3I4zPWlCQBk8BWn9M2r2nD/xCP60AJ4gkDmblK8FT4aI6ZC5bCWVnCXC6kJV7jnBry+mbV7Th/wCIR/Wm0+Ubh5zcpWuzcYMlexiZHdV+y26lR/A1sUII5gEHiKUpXJ2KUpSIpSlIilKUiKg9R3eyogS7ZNubMdx5hSCndlScjhwHyqu6pul/n6n9W7c8iGlaQUrC9hdBTk5VzA58B3VTNR2R+wXIRJD4fcW0l0rSDgkk558Ty5176NKGI3NgnviZ9+qKg7VyB2JkhoO33CRqOJMitqDDDhDzu3KUjacg+8cPOuw1yjo1nSmtR+hNrJjvtqU4jsyBwV7+zzrokPUFvudvlTILxcRF3BeUlJBCc9tNcGNvEaEoKpxi+PiXfZ8jgeskuEe7ccVZ+i+f1F8kQicJlM5A/tJOfkTVWtcU3O7xIqif9ZeSkn3njWzY5KrNqiI84dvo8kIcz2DO1X4E1p2oGqNfsmZUxW0WeGZ0vX97+ibAphpeJE3LSMcwn7x+HDzrj+AOwfCrHqCc/q3VoaifXQpwR4w7NuftefE+6oR6On6QXFZUVp64toV+19bANQ0tYqTB55MnqrDa+RxwJb9YJEPRenIHAEt9YoeO0fmo1Cae0lN1I2+uI4w2lgpSou5GSc8sA91TPSc4lF2gQkn6seKOHdk4/wAtQ1i1ZctPRnWIKGNrq96i42VHOMd9Rq6nQBTk/mStNfpBD8D8TUvNml6euXokooDoSFpW0rgQeRB59ldX0PcpN00ww9LWXHUKU31iuawk8CfH+lcml3F6+XYSrpK2lwhK3Q3kISO5I7B3V2qxw4cCyxY8BYcjJbBQ5nO/PHd55zVGuJ6ahv8AU9GhGbGK/wCZv0pWayZrTFZrFKRFKUpEUpSkSpa7jeiNw9RsJHpNteTnPDegnGD5n8TVK1zd4t7ukSXEJ2mGjclXNJJUcHxwRXXpJYEZxUkILKUkubxlO0cTmuAPul6Q46TnesqzjHM1q6H1+5/5+8ydf6nYf9faWXR2l7ld1KmMTFQouS046hWHFDgSlP4cavV3t8HTeirk1b2QygsKBOclSlAJyT2njVV0JrJm2totFwCW45UeqfAxsJPJXhnt7Kvt+tAvtodt5kFhLpSStKd3AHOMeVV6l3FwD9hn6S3TIhpJr7nH1nKtBx/SNYQcjg1vcPkk4/HFfOuIPoGrJqQMIeUHk+5QyfxzV/03oZnTtzVOTOXIUWi2EqbCcZI48/CpG8aWtN+kokT2FrcQjYFIcKeGc9nvqw6xBfvHGMSsaNzRsPOcyndH9oES3TNRyE/YaWmPnsAB3K/DHxqp6bYMzUttaVx3yUFXkcn5V1GVO045Y3LJGvUOK2pn0dO1wEoHLlnia07H0esWW8MXEXFx8s5IbLQSCSCOefGuLqQA7P2J4htMSUVO4HMpnSDI6/WMsZ4NJQ38Egn51aNKap07atNRIkqYlL6EqLiepUcEqJ7q8NQ6Qs671IlXDUrcN6UouhpxCQQDw7Ty4VpHQ1hTETLVqpsR1rKEulCdpUOYB3c6mWpepUYnt7P1IBbktZ1A7+39ytajnxLnf5cyE11UdxQKRt25wACcdmcZrrmkYzsTSluZfBS4GQSDzGSSB8DVWtNh0Rbn0vv3yPOcQcpDryQgH+6OfnV1h3i2T19XDuEaQv8AZbdBPwqjVWBkCKDgS/S1FXLsRkzcpSlZ80YpSlIilKUiKUqq601SLVF+jresruUj6qQ3xLQPb7z2DzqdaGxtqyFjitdxmt0iX9iLZ12ph9KpUkhLiEnJQjmc92eA8zULobRiZ/8AtS6sBUUpIZZWP+Jn7x8O7v51vaZ6PEFIm6gSXHVncIxUeHis9p8PjV+SlKEhKUhKQMAAYAFet7lqTpVH3n8TxpS1tnVtHuH5nMdX6Fi2eE7c4Uvq2UkD0d7ick4wlXb7j8atHR7LnS9MoMwEpbcLbDiua0D+hyPKovpOU5ITarcycuPvKIQO08Ej8VVYZk6Fo3TbPWAqRHQlppCeBcVjl8yTXXdnoVT3JPacRFS9mHYAd5TVXnUOrdRSYlruP0fHjhSk4XsASk4ySOJJPkKlejzUFyujkyHPfMkRwlSHTz4kjGe3lkVz6Yib9e7CM5FiznHAkoJCTk5KQe0e/njwq6WfUVrsJhWrT8FVwcmhCnXVubFbzw2ngeQzw7K9N1Q6e1R+sc5M89Np6m5j+88YEp2pYvoOpbiwnhskLKfcTuHzrtkKWh+1R5i1AJWwlwqPIApBJrlvSTF9H1WXscJDCF+8jKT8hUnO1B6P0XQGEL/Ty0GNz4hKSQo/DA86jchurrI8f77TtDimywHw/vvKvdpj+qNTuOspKlSXQ2wnuTySPz+NWPpBjM2mz2WzsfZZC1H+0QAM+ZJNZ6MrJ18168PJ+pH/AEbOe1ZHE+Q+da3SfI63UbDAPBmMnh4qJP8ASrdwOoWteFle0jTtY3LTW01oZ3UVrVOE9MYB0thJaKs4A45yO+oO5wn7FeXovXgvRV8HWjjjjII7jU7aY2t2bS2bUmUiEsFaOrUjiD2jPGoqyOw06iZVfGnXkF7DgKuIXnmrPEjPMVarPuYlgR5CUsqbVAUg+Znarc66/bIrr4w64yhS/wC8Ugn8a2KUrAPM+hEUpSuRFKUpEitUsqf0vckJUpKvRlqBSePAZ/Kqp0Z2RtTD16fQlbilltgq4lOPtHz5eRq4Tr9Z4D5jTrhHZc2gltxeDg+FR1uvWk7VGMaDc4bLO9S9geyAScnGeXur1IziooAe88rqhtDkjtLDSoj1s097ZifzBT1s097Zh/zBVHTfyMu6qeYlCvt4lNdIEabc4rjEeG8EtJWg8WwftDvPHPDwqy67tUjUFjjSLXiV1Cy4EtkHrEkYyO8+FSE2+6TuUYx5twt8ho/dcWCPf4Vi33rSVqi+jQbhBYZ3FWxLnaeZ416zY3qsqkFflPIEX1lZwQ3zlDF1v0zTyNN/QReCEhCVlhe9ODwPcCO+trR1sudg1Qn0+yyFJUnqy8GyoMk/eBHDHYavfrbp/wBsxP5tPWzT/tmJ/MqRucqVFeAffOClAwY2ZI90qnStEy3bpgHJS2lH34I+RqgoMqYY0JG5zCihlvxUfzNdgn3rSV0YDE6fb5DaVbglxYIB7/xrUjPaDhyUSIztraebOULSoZSfCrKdQ1dYUoSRKrtOtlhYOADJyyWtuy2ePAbweqR9ZQ+8o8VH41ybXL5kawnnsQpLY8kgfPNdR9bNPe2Yf8wVFPuaCkvuPvuWpx1xRUtalZKie01Tp3aty7KTmX6hFtrCKwGJWofSU9AtjEJi0tfoGktpWp44OBjJGPzqC0/a5eo9QowkqCnutkOgcEDOTn39gq/gdHoOR9EfhUnH1HpaI0Go1yt7LY5IbUEj4CrusEB6dZBMp6JcjqWAgScpUR62ae9sw/5grYh3603CR6PDuMd90gq2NrycDnWca3HciaIsQ9gZv0pSoScUpSkTkXSRw1a4f+g38jW7F6NJEmExJ+lmGw+2lYSpo8MjOM5rS6SP1sc/d2/kamddfqRY/wDx/wDyraDOK61Q4zMUqhstZxnEr9w0Tc7ZcokWQpssy3ksokoyUgk9o5g1LO9GLzIJXeoySBnBbIPzqd02ZCtEQzdNxV6U36P1v2sdanZz88eFa2uxpb01w3VT4uPov6EI3bcfW25xw55qr0i0vszxngZlvo9QTfjnHJxKvp/Q1yvsYTC6iJFV9hxwElfiAOzxNfWodDTrDCM30lmVGSQFKT9VSc8uB5+Rqwa/VJb0za0wNwt5SA4W+WNo2Zx2c/OorQlqmXmS2ZS3VWqE51qW1k7FO9gHu5n/APatF1hXrFhjy/vGVGmsN0Qpz5/3hPJfR9OZszdwkTG2lKCCpkoJUjcoDic9makP9FknGfphjHf1J/rVh1LIlydF3lyVGVHwspaQrGSgKThR9/E1A2s/7pLh/ec/9k1St1zLu3eOOBLWopVtu3wzyZDz9DvwbVPuBntOIhLKCkNkFeMcjnxrVtulXrjpyXeky0IRF35aKCSraAefnVv0mICujmR9KbjC6xwvbc5xuHdx7q3GxZfUG7mw7/RS09u37s79oz9rj3VM6mxcr45xnHaRGmrbDDjGcZ7yh6k0s9pxqI47LQ/6UFEBKCnbgA9vvrZsGhbjfIgmLdbhxlfYW4CSsd4Hd4mpvpQI9Ds2TgbV5+CK9OkcyEWW1phlQtu3Cur+znA2Z8MZxU1vsZEGe7Z7+6QaitXckdlx298gr9oK42aEqa0+3NjIGVqbBCkjvx2j3Gvm46HmwNPt3hEhEhtTaXFtpQQpCVDOefHGeNTvRmZSoNyTJ3G27Rjf9ndg7seXOrG5eYtotVkbkpSYkxCWFKVySC2ME+HYffVb6i5H2c4Pzliael034xkfKc1iaYdl6Xk34S0JRHKgWSgkqxjtz41v9G362p/d3Pyq23Syt2HQt6iMqyyordaHalKin6vliql0b/ran93c/KrOqbabD4eEr6QqurHj4zrlKUrFm1FKUpE5F0kDOrXP+w38jW/G6S1R4MeKqzNO9Q2lAUp7ngYzjbV9m6etFxkmRMtzD7xASVrTk4HKvD1Q077Hi/wVoDU0lFV1ziZx01wsZkbGZzW464uNzuUOS+2hMeI+l5MZskBRB7SeJPyqZc6TWnlbndPsrVjGVOgn8U1cfVDTvseL/BT1Q077Hi/wV036Y4GziBRqRn1+Zzqw69nWaIIT0ZEyKnIQlatqkDuzxyPAiva69I1ylxxHt0dFtR2qbVuX7gcAD4VYrydD2GamHNtTQdUgLw2xuGCSB2+Faka59H8uU1GatKS68sIQDFPMnA7at3Vsep0jKdtqjp9USuua2nSdNybRNQqU5IP/ADK3OKRkHGMeH414RdUORtKSLAIaVJfKj13WEEZIPLHhVtnzdA22c9CkWpHWsq2L2xyRn35rescPRuoUvKgWhkhggLK2NvPOO3wrptrVcmsgZzOCqxmwLATjEosTVTkXSkiwiGlSX92XusII3EHljwrNt1W5btMy7IIaXEyt+XS4QU7gByx4VcburQtknCFMtbPXbQohtgqCQeWTmpeZpzS8GC9MetEUMstlxRDeeAGeFcN9WO6Huc/GSFFuezjsMfCVUdJ4LaEOWNtzYAAVPZ/y1oW3pEnQeuZfhtyoq3FKQ0tWC2CSdoOOIGe0VarHE0ZqFLxgWlg9QQFhxnaeOcdvga8M6GN8+h0Wppcrreq+qxlO7t457Khup7r0z7ZLbccN1B7JWL7r6ddoKoEaM3BjLTtWEHKlDuzgYHuFaV81Su92iDblQ0sphgALCyrfhO3ljhXUPVDTvseJ/BT1Q077Hi/wUXVULjCcTraXUNnL8znCtcS3tLLscmMHiprqhILh3bc8MjHHGMc69Ojb9bU/u7n5V0P1Q077HifwVsQtP2i2yPSIVuYYdwU70JwcHnUW1VWxlRcZnV0tvUVnbOJI0pSs6aUUpSkRSlKRFKUpErWuWIbemZ8xcVhUgtpbQ6psFYyoAYPPtNeehrRCRpiBJdhsKkLy71qmwVDKjjjz5YqQ1VZH9QWf0BiQhgl1K1KWkqBAzw4eOK3YUFUGyswGljczHDSV44ZCcZ+PGvR1B0QoPfM8/TPWLY7YnLrS9c5V+utwt9lYuvWOq3B9IUlGVEjGSOPCug2+ULVppy5XK3R7c6lKnHmWEBI4EhI4cyeHxqsxOjy+QEqTD1EI4WQVBpK07j44NSlw0ldrhpyLaXLyFqQ4px95xKlFw5+qOfIZ/AV6bmqcgbhj48TzUpaik7Tn4czn8tyPdLdcLrMlt/ST8lJQxk7gj73lxAHgmr3ebp1/RYJWfrPxmmz7yQk/I1uzNB2V21ORY0NpmQWtqJBBKgr9o8a1HtFTXtHM2A3BoFqQXOt6s428SBjPea611T7TnGD9JxaLU3DHI+spdoucrSD7zm0qVOt6VtcOSlcUny41uaPtb0fXzDEnJejtqedB5pUUZwfHKhnxq/r0ra5Dtvfksl16A0hts7iEkJ5ZHbx414WnTDlv1TcL27JQ76WFBCAggoBIPPt4ACjapGVvMj++kLpXVl8gf76yw0pSs2aUUpSkRSlKRFKUpEUpSkRSlKRFKUpEUpSkRSlKRFKUpEUpSkRSlKRFKUpE/9k=";

// ---------- Icon set (hand-drawn, Lucide-style stroke icons — no external dependency) ----------
function Icon({name, size=17, style}){
  const common = {width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round', style};
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    upload: <><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></>,
    trending: <><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
    truck: <><path d="M2 8h11v8H2z"/><path d="M13 11h4l4 3v2h-8"/><circle cx="6.5" cy="18.5" r="1.7"/><circle cx="17" cy="18.5" r="1.7"/></>,
    compare: <><path d="M8 3v18"/><path d="M16 3v18"/><path d="M4 8l4-5 4 5"/><path d="M12 16l4 5 4-5"/></>,
    box: <><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></>,
    activity: <><path d="M22 12h-4l-3 8-6-16-3 8H2"/></>,
    sun: <><circle cx="12" cy="12" r="4.3"/><path d="M12 2v2.4M12 19.6V22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2 12h2.4M19.6 12H22M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></>,
    moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z"/>,
    chevronDown: <path d="M6 9l6 6 6-6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    trash: <><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></>,
    download: <><path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    filter: <path d="M4 5h16l-6.5 8v6l-3 2v-8z"/>,
    fileText: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></>,
    package: <><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/><path d="M7 5.5l10 5.5"/></>,
    ship: <><path d="M2 20l1.6-5h16.8L22 20"/><path d="M5 15V7l7-3 7 3v8"/><path d="M9 15V9M15 15V9"/></>,
    layers: <><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    redact: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><rect x="7.5" y="12.5" width="9" height="3" rx="1" fill="currentColor" stroke="none"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.29 20.29 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a20.29 20.29 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
  };
  return <svg {...common}>{paths[name]||paths.box}</svg>;
}
const PAGE_ICONS = {
  dashboard:'dashboard', weeklyimport:'upload', forecast:'trending', firmorders:'fileText',
  comparison:'compare', accessories:'package', shipmentmgmt:'ship', shipmentperf:'activity',
  podocedit:'redact', users:'users',
};
// The set of assignable modules an admin can grant/revoke per user (everything in the
// sidebar except the Users page itself, which is tied to the isAdmin flag, not a module).
const MODULE_LIST = [
  {key:'dashboard', label:'Dashboard'},
  {key:'weeklyimport', label:'Weekly Data Import'},
  {key:'forecast', label:'Forecast'},
  {key:'firmorders', label:'Firm Orders'},
  {key:'comparison', label:'Forecast vs Firm'},
  {key:'accessories', label:'Accessories'},
  {key:'shipmentmgmt', label:'Shipment Management'},
  {key:'shipmentperf', label:'Shipment Performance'},
  {key:'podocedit', label:'PO PDF Editor'},
];
// Admins always see every module. A user with no moduleAccess object at all is a legacy
// account created before per-module access existed — treat as full access so nobody who
// already had a login is silently locked out. Once an admin edits their access, the object
// is materialized with explicit true/false per module.
function hasModuleAccess(user, key){
  if(!user) return false;
  if(user.isAdmin) return true;
  if(!user.moduleAccess) return true;
  return user.moduleAccess[key] !== false;
}
// Flat vector illustration used on each module's header banner — one lightweight inline SVG
// per module, drawn in the Decathlon blue/white palette so it always matches the theme.
function BannerArt({page}){
  const wrap = (children)=><svg viewBox="0 0 160 100" width="100%" height="100%">{children}</svg>;
  const glass = 'rgba(255,255,255,.9)'; const glassDim = 'rgba(255,255,255,.55)'; const glassFaint='rgba(255,255,255,.28)';
  if(page==='dashboard') return wrap(<>
    <rect x="14" y="52" width="26" height="34" rx="3" fill={glassDim}/>
    <rect x="46" y="34" width="26" height="52" rx="3" fill={glass}/>
    <rect x="78" y="20" width="26" height="66" rx="3" fill={glassDim}/>
    <circle cx="128" cy="30" r="18" fill="none" stroke={glassFaint} strokeWidth="3"/>
    <path d="M128 30 L128 16 A14 14 0 0 1 140 36 Z" fill={glass}/>
  </>);
  if(page==='weeklyimport') return wrap(<>
    <rect x="30" y="30" width="70" height="52" rx="5" fill={glass}/>
    <path d="M65 62 L65 38 M53 50 L65 38 L77 50" stroke="#0082C3" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="106" y="46" width="34" height="36" rx="4" fill={glassDim}/>
    <path d="M114 58h18M114 66h18M114 74h10" stroke="rgba(0,61,107,.5)" strokeWidth="2.4" strokeLinecap="round"/>
  </>);
  if(page==='forecast') return wrap(<>
    <path d="M12 78 L40 50 L62 64 L94 26 L120 44 L148 18" fill="none" stroke={glass} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="94" cy="26" r="5" fill="#fff"/><circle cx="148" cy="18" r="5" fill="#fff"/>
    <rect x="12" y="82" width="136" height="3" rx="1.5" fill={glassFaint}/>
  </>);
  if(page==='firmorders') return wrap(<>
    <rect x="36" y="16" width="60" height="76" rx="4" fill={glass}/>
    <path d="M50 34h32M50 46h32M50 58h22" stroke="rgba(0,61,107,.45)" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="112" cy="66" r="20" fill="#0EA5A0"/>
    <path d="M103 66l7 7 14-14" stroke="#fff" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </>);
  if(page==='comparison') return wrap(<>
    <rect x="18" y="20" width="46" height="60" rx="4" fill={glassDim}/>
    <rect x="94" y="20" width="46" height="60" rx="4" fill={glass}/>
    <path d="M70 50h18" stroke="#fff" strokeWidth="3.4" strokeLinecap="round"/>
    <path d="M82 42l8 8-8 8" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
  </>);
  if(page==='accessories') return wrap(<>
    <path d="M40 42L80 22l40 20-40 20-40-20z" fill={glass}/>
    <path d="M40 42v34l40 20 40-20V42" fill="none" stroke={glassDim} strokeWidth="3"/>
    <path d="M80 62v34" stroke={glassDim} strokeWidth="3"/>
  </>);
  if(page==='shipmentmgmt') return wrap(<>
    <path d="M10 78h108l10-16H24z" fill={glass}/>
    <rect x="30" y="34" width="60" height="30" rx="3" fill={glassDim}/>
    <path d="M40 34v-8h16v8" fill="none" stroke={glass} strokeWidth="3"/>
    <circle cx="42" cy="84" r="7" fill="#003D6B"/><circle cx="96" cy="84" r="7" fill="#003D6B"/>
  </>);
  if(page==='shipmentperf') return wrap(<>
    <path d="M14 80h132" stroke={glassFaint} strokeWidth="2"/>
    <rect x="24" y="56" width="14" height="24" rx="2" fill={glassDim}/>
    <rect x="46" y="40" width="14" height="40" rx="2" fill={glass}/>
    <rect x="68" y="50" width="14" height="30" rx="2" fill={glassDim}/>
    <rect x="90" y="30" width="14" height="50" rx="2" fill={glass}/>
    <path d="M118 62l10-16 10 8 10-22" fill="none" stroke="#0EA5A0" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
  </>);
  if(page==='podocedit') return wrap(<>
    <rect x="18" y="10" width="58" height="78" rx="4" fill={glass}/>
    <rect x="26" y="22" width="42" height="4" rx="2" fill="#003D6B"/>
    <rect x="26" y="34" width="42" height="4" rx="2" fill={glassFaint}/>
    <rect x="26" y="34" width="42" height="4" rx="2" fill="#003D6B" opacity=".55"/>
    <rect x="26" y="44" width="26" height="30" rx="2" fill="#003D6B" opacity=".18"/>
    <rect x="84" y="10" width="58" height="78" rx="4" fill={glass}/>
    <rect x="92" y="22" width="42" height="4" rx="2" fill="#003D6B"/>
    <rect x="92" y="34" width="42" height="4" rx="2" fill={glassFaint}/>
    <rect x="92" y="44" width="42" height="30" rx="2" fill="#0EA5A0"/>
    <path d="M79 46l6-6 6 6M85 40v16" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </>);
  return wrap(<rect x="20" y="20" width="120" height="60" rx="8" fill={glassDim}/>);
}

// ---------- storage helpers ----------
// Prefers window.storage (available when this file runs as a Claude artifact, with
// shared/team-wide sync). Falls back to localStorage (per-browser only) so the app
// still saves reliably when opened as a standalone .html file outside claude.ai.
const hasCloudStorage = typeof window!=='undefined' && window.storage && typeof window.storage.get==='function' && typeof window.storage.set==='function';
async function storeGet(key,shared){
  if(hasCloudStorage){
    try{ const r = await window.storage.get(key,!!shared); return r ? JSON.parse(r.value) : null; }
    catch(e){ /* fall through to local fallback below */ }
  }
  try{ const raw = localStorage.getItem('embee_'+key); return raw ? JSON.parse(raw) : null; }
  catch(e){ return null; }
}
async function storeSet(key,value,shared){
  if(hasCloudStorage){
    try{ await window.storage.set(key, JSON.stringify(value), !!shared); return true; }
    catch(e){ console.error('cloud storage set failed, falling back to localStorage',e); }
  }
  try{ localStorage.setItem('embee_'+key, JSON.stringify(value)); return true; }
  catch(e){ console.error('storage set failed',e); return false; }
}

// ---------- Auth (soft gate — client-side only, no real server, see login screen copy) ----------
async function hashPassword(pw){
  const enc = new TextEncoder().encode('embee-erp::'+pw); // fixed salt, good enough to avoid plaintext-in-storage, not real security
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

// ---------- Shipment Management: Commercial Invoice PDF parsing ----------
// EMBEE's CI template always carries these header fields plus a style-wise table.
// pdf.js gives text items with x/y positions but no guaranteed reading order, so we
// bucket items by y (row) and sort each bucket by x (left-to-right) to rebuild lines —
// this is what makes label/value pairs land on the same reconstructed line.
async function pdfToLines(file){
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data:buf}).promise;
  let fullText = '';
  for(let p=1;p<=pdf.numPages;p++){
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const buckets = {};
    content.items.forEach(it=>{
      const key = Math.round(it.transform[5]/3)*3;
      (buckets[key]=buckets[key]||[]).push(it);
    });
    const lines = Object.keys(buckets).sort((a,b)=>b-a).map(k=>
      buckets[k].sort((a,b)=>a.transform[4]-b.transform[4]).map(it=>it.str).join(' ')
    );
    fullText += lines.join('\n')+'\n';
  }
  return fullText;
}
function grabNear(text,label,valueRegex){
  const idx = text.toUpperCase().indexOf(label.toUpperCase());
  if(idx===-1) return '';
  const m = text.slice(idx, idx+130).match(valueRegex);
  return m ? m[1].trim() : '';
}
function ciNormalizeDate(raw){
  const m = (raw||'').match(/(\d{2})\.(\d{2})\.(\d{4})/);
  return m ? m[3]+'-'+m[2]+'-'+m[1] : '';
}
// Line items always end in four numbers (Qty Packs, Qty Pcs, Price/Pack, Total Price) —
// any digits inside the R3 code sit earlier in the line, so "last 4 numbers" is safe.
function ciExtractLineItems(fullText){
  const rows = fullText.split('\n').map(l=>l.trim()).filter(Boolean);
  const stopRe = /BANK DETAILS|BENEFICIARY|IBAN|SWIFT|TOTAL AMOUNT|^PCS PCS|^PCS PACKS|^PACKS PACKS/i;
  const styleRe = /^(\d{5,6})\s+(\d{6,10})\s+(.*)$/;
  const items = [];
  let current = null;
  const finalize = (cur)=>{
    const nums = (cur.rest.match(/-?\d[\d,]*\.?\d*/g)||[]).map(v=>parseFloat(v.replace(/,/g,'')));
    if(nums.length<4) return null;
    const [qtyPacks,qtyPcs,price,total] = nums.slice(-4);
    const seasonM = cur.rest.match(/-\s?(AW\d{2}|SS\d{2})/i);
    return {
      styleNo:cur.styleNo, po:cur.orderNo,
      color: cur.rest.replace(/-?\d[\d,]*\.?\d*/g,'').replace(/\(R3\s*CODE\s*:?\)?/ig,'').replace(/\s{2,}/g,' ').trim(),
      season: seasonM? seasonM[1].toUpperCase() : '',
      qtyPacks: qtyPacks||0, qtyPcs: qtyPcs||0, price: price||0, total: total||0,
    };
  };
  for(const line of rows){
    const m = line.match(styleRe);
    if(m){
      if(current){ const it=finalize(current); if(it) items.push(it); }
      current = {styleNo:m[1], orderNo:m[2], rest:m[3]};
    } else if(current && !stopRe.test(line)){
      current.rest += ' '+line;
    }
  }
  if(current){ const it=finalize(current); if(it) items.push(it); }
  return items;
}
function ciExtractHeader(fullText){
  const data = {};
  const invM = fullText.match(/EIE[\/\-\s]*(\d{3,5})[\/\-\s]*(\d{2})\b/i);
  data.invoiceNo = invM ? 'EIE/'+invM[1]+'/'+invM[2] : '';
  data.dateRaw = grabNear(fullText,'DATE', /(\d{2}\.\d{2}\.\d{4})/);
  data.date = ciNormalizeDate(data.dateRaw);
  const consM = fullText.match(/CONSIGNEES NAME\s*\n?([A-Z0-9 .&,\-]+)/i);
  data.consignee = consM ? consM[1].trim().split('\n')[0] : '';
  data.portOfLoading = grabNear(fullText,'PORT OF LOADING', /([A-Z][A-Z .]{2,20})/);
  data.portOfDischarge = grabNear(fullText,'PORT OF DISCHARGE', /([A-Z][A-Z .()]{2,25})/);
  data.countryOrigin = grabNear(fullText,'COUNTRY OF ORIGIN', /([A-Z][A-Z .]{2,20})/);
  data.paymentTerms = grabNear(fullText,'PAYMENT TERMS', /([A-Z0-9 ]{2,20})/);
  data.season = grabNear(fullText,'SEASON', /([A-Z0-9\/\- ]{2,20})/);
  data.supplierNo = grabNear(fullText,'SUPPLIER NO', /(\d{2,10})/);
  data.cartons = parseFloat((grabNear(fullText,'TOTAL CARTON', /(\d[\d,]*)/)||'0').replace(/,/g,''))||0;
  data.qty = parseFloat((grabNear(fullText,'TOTAL QUANTITY', /(\d[\d,]*)/)||'0').replace(/,/g,''))||0;
  data.grossWeight = parseFloat((grabNear(fullText,'G.W', /([\d,]+\.?\d*)/)||'0').replace(/,/g,''))||0;
  data.netWeight = parseFloat((grabNear(fullText,'N.W', /([\d,]+\.?\d*)/)||'0').replace(/,/g,''))||0;
  const valRaw = grabNear(fullText,'TOTAL AMOUNT SHOULD BE PAY', /([\d,]+\.\d{2})/);
  data.fobValue = parseFloat((valRaw||'0').replace(/,/g,''))||0;
  return data;
}
async function parseCommercialInvoicePDF(file){
  const fullText = await pdfToLines(file);
  const header = ciExtractHeader(fullText);
  const lineItems = ciExtractLineItems(fullText);
  const lineQtySum = lineItems.reduce((s,i)=>s+i.qtyPcs,0);
  const reviewFlag = (header.qty>0 && Math.abs(lineQtySum-header.qty) > Math.max(2, header.qty*0.01))
    ? `Line items sum to ${fmt(lineQtySum)} pcs but header states ${fmt(header.qty)} pcs — please verify.`
    : (!header.invoiceNo ? 'Could not confidently read the invoice number — please check.' : '');
  return {
    id: 'inv_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),
    ...header,
    lineItems,
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    reviewFlag,
  };
}
// One "shipment" = invoices that moved together (same despatch date + loading/discharge ports).
function computeShipmentGroups(invoices){
  const map = {};
  invoices.forEach(inv=>{
    const key = [inv.date, inv.portOfLoading, inv.portOfDischarge].join('|');
    (map[key]=map[key]||[]).push(inv);
  });
  return Object.values(map);
}
function computeInvoiceKpis(invoices){
  return {
    totalInvoices: invoices.length,
    totalShipments: computeShipmentGroups(invoices).length,
    totalQty: invoices.reduce((s,i)=>s+(i.qty||0),0),
    totalFobValue: invoices.reduce((s,i)=>s+(i.fobValue||0),0),
    totalCartons: invoices.reduce((s,i)=>s+(i.cartons||0),0),
    totalGrossWeight: invoices.reduce((s,i)=>s+(i.grossWeight||0),0),
    totalNetWeight: invoices.reduce((s,i)=>s+(i.netWeight||0),0),
  };
}
// Generic grouping used by every Shipment Management report (Weekly/Monthly/Factory/Style/PO/Season/Country).
function groupInvoicesBy(invoices, keyFn){
  const map = {};
  invoices.forEach(inv=>{
    const key = keyFn(inv) || 'Unspecified';
    if(!map[key]) map[key] = {key, invoices:[], qty:0, fobValue:0, cartons:0, sortDate:inv.date||''};
    else if(inv.date && (!map[key].sortDate || inv.date < map[key].sortDate)) map[key].sortDate = inv.date;
    map[key].invoices.push(inv);
    map[key].qty += (inv.qty||0);
    map[key].fobValue += (inv.fobValue||0);
    map[key].cartons += (inv.cartons||0);
  });
  return Object.values(map).sort((a,b)=>b.fobValue-a.fobValue);
}
function groupLineItemsBy(invoices, keyFn){
  const map = {};
  invoices.forEach(inv=>{
    (inv.lineItems||[]).forEach(li=>{
      const key = keyFn(li,inv) || 'Unspecified';
      if(!map[key]) map[key] = {key, qty:0, fobValue:0};
      map[key].qty += (li.qtyPcs||0);
      map[key].fobValue += (li.total||0);
    });
  });
  return Object.values(map).sort((a,b)=>b.fobValue-a.fobValue);
}
function isoWeekOf(dateStr){
  if(!dateStr) return 'Unspecified';
  const d = new Date(dateStr+'T00:00:00');
  const day = (d.getDay()+6)%7;
  const monday = new Date(d); monday.setDate(d.getDate()-day);
  const sunday = new Date(monday); sunday.setDate(monday.getDate()+6);
  const opt = {day:'2-digit',month:'short'};
  return monday.toLocaleDateString('en-GB',opt)+' – '+sunday.toLocaleDateString('en-GB',opt)+' '+sunday.getFullYear();
}
function monthOf(dateStr){
  if(!dateStr) return 'Unspecified';
  const d = new Date(dateStr+'T00:00:00');
  return d.toLocaleDateString('en-GB',{month:'short',year:'numeric'});
}

// ---------- parsing: Forecast (unpivot week matrix) ----------
function parseForecastWorkbook(wb, fileName){
  const ws = wb.Sheets['Forecast Detail'] || wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, {defval:null});
  const weekColRe = /^\d{1,2}\.\d{4}$/;
  const lines = [];
  let weekCols = [];
  if(rows.length) weekCols = Object.keys(rows[0]).filter(k=>weekColRe.test(k));
  for(const r of rows){
    const itemCode = r['Item'];
    if(itemCode==null) continue;
    for(const wk of weekCols){
      const qty = Number(r[wk])||0;
      if(qty===0) continue;
      lines.push({
        itemCode: String(itemCode),
        itemName: r['Item Name']||'',
        model: r['Model']!=null? String(r['Model']):'',
        modelName: r['Model Name']||'',
        ccCode: r['CC']!=null? String(r['CC']):'',
        brand: r['Brand']||'',
        supplier: r['Supplier']||'',
        vendorPlant: r['Vendor Plant']||'',
        week: wk,
        forecastQty: qty,
      });
    }
  }
  return {
    id: 'fc_'+Date.now(),
    type:'FORECAST',
    fileName,
    uploadedAt: new Date().toISOString(),
    rowCount: lines.length,
    itemCount: new Set(lines.map(l=>l.itemCode)).size,
    lines,
  };
}

// ---------- parsing: Firm Orders (Orders + Size Breakdown) ----------
function parseFirmOrderWorkbook(wb, fileName){
  const ordersWs = wb.Sheets['Orders'];
  const sizeWs = wb.Sheets['Size BreakDown'];
  const orderHeaders = ordersWs ? XLSX.utils.sheet_to_json(ordersWs,{defval:null}) : [];
  const sizeRows = sizeWs ? XLSX.utils.sheet_to_json(sizeWs,{defval:null}) : [];

  const orderById = {};
  for(const o of orderHeaders){
    if(o['Order number']==null) continue;
    orderById[String(o['Order number'])] = {
      poNumber:String(o['Order number']),
      model:o['Model']!=null?String(o['Model']):'',
      modelLabel:o['Model Label']||'',
      imanCode:o['Iman Code']!=null?String(o['Iman Code']):'',
      season:o['Season']||'',
      ehdDate:o['EHD - Supplier Handover Date']||null,
      ehdWeek:o['EHD Week']!=null?String(o['EHD Week']):'',
      orderType:o['Order Type Label']||'',
      factory:o['Supplier / SubContractor']||'',
      deliveredThird:o['Delivered Third']||'',
      orderDate:o['Order Creation Date']||null,
      orderedQty:Number(o['Ordered Qty'])||0,
    };
  }

  const lines = [];
  for(const r of sizeRows){
    if(r['Type']!=='Detail') continue; // skip subtotal "Order" rows
    const itemCode = r['Item Code'];
    if(itemCode==null) continue;
    const po = String(r['Order number']);
    lines.push({
      poNumber: po,
      itemCode: String(itemCode),
      model: r['Model']!=null?String(r['Model']):'',
      imanCode: r['Iman Code']!=null?String(r['Iman Code']):'',
      size: r['Item Primary Scale']||'',
      orderQty: Number(r['Ordered Qty'])||0,
      shippedQty: Number(r['Shipped Qty'])||0,
      deliveredQty: Number(r['Delivered Qty'])||0,
      remainingQty: Number(r['Remaining Quantity'])||0,
      ehd: r['EHD - Supplier Handover Date']||(orderById[po]&&orderById[po].ehdDate)||null,
      season: r['Order Type Label']?null:null,
      orderMeta: orderById[po]||null,
    });
  }
  return {
    id:'fo_'+Date.now(),
    type:'FIRM_ORDER',
    fileName,
    uploadedAt:new Date().toISOString(),
    rowCount:lines.length,
    poCount:Object.keys(orderById).length,
    itemCount:new Set(lines.map(l=>l.itemCode)).size,
    orders:orderById,
    lines,
  };
}

// ---------- parsing: Selection File (planning starts here, not from Firm Orders) ----------
// Accepted headers (case/space-insensitive): Season, Buyer, Style Number/Style, Style Description/Description,
// Colour/Color, Factory, Country, Company (EMBEE/GLOBE), Supplier, Selection Qty.
const SELECTION_HEADER_ALIASES = {
  'season':'season','buyer':'buyer','style number':'styleNo','style':'styleNo','style no':'styleNo',
  'style description':'description','description':'description','colour':'color','color':'color',
  'factory':'factory','country':'country','company':'company','supplier':'supplier',
  'selection qty':'selectionQty','selection quantity':'selectionQty',
};
function parseSelectionWorkbook(wb, fileName){
  const ws = wb.Sheets[wb.SheetNames[0]];
  const grid = XLSX.utils.sheet_to_json(ws, {header:1, defval:null, raw:true});
  if(!grid.length) throw new Error('The sheet is empty.');
  let headerRowIdx = 0;
  while(headerRowIdx<grid.length && (!grid[headerRowIdx] || grid[headerRowIdx].every(c=>c==null||String(c).trim()===''))) headerRowIdx++;
  const headerRow = grid[headerRowIdx] || [];
  const colMap = headerRow.map(cell=> cell==null? null : SELECTION_HEADER_ALIASES[String(cell).trim().toLowerCase()] || null);
  if(!colMap.includes('styleNo')) throw new Error('No "Style Number" column found. Expected headers like Season, Buyer, Style Number, Style Description, Colour, Factory, Country, Company, Supplier, Selection Qty.');
  const rows = [];
  for(let r=headerRowIdx+1; r<grid.length; r++){
    const row = grid[r];
    if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
    const rec = {season:'',buyer:'',styleNo:'',description:'',color:'',factory:'',country:'',company:'',supplier:'',selectionQty:0};
    colMap.forEach((field,idx)=>{
      if(!field) return;
      const cell = row[idx];
      if(field==='selectionQty') rec.selectionQty = cell==null? 0 : Number(cell)||0;
      else rec[field] = cell==null? '' : String(cell).trim();
    });
    if(!rec.styleNo) continue;
    rows.push(rec);
  }
  if(!rows.length) throw new Error('No style rows found under the header row.');
  return { id:'sel_'+Date.now(), type:'SELECTION', fileName, uploadedAt:new Date().toISOString(), rowCount:rows.length, rows };
}

// ---------- parsing: Weekly Shipment Booking (EMBEE & GLOBE) ----------
// Linked automatically to a style using: Season, PO, Style, Colour, Factory, Company.
// Supports two shapes:
//  1) A simple flat sheet — headers: Season, PO, Style, Colour, Factory, Company, Shipped Qty, Shipment Date.
//  2) The real EMBEE "PRE-ALERT" booking workbook — one sheet per factory (sheet name = factory),
//     a free-form cover-letter block above the table, then a line-item table with headers:
//     Group, MPC Description, Item Code, Garment Color, Model, STYLE#, PO#, Size, PCS PER CARTON,
//     TTL CARTON, TTL NO PCS, Price USD/PC, ... — "Garment Color" carries the color AND season/R3
//     code together, e.g. "DKT-N07A BLACK - (R3 Code: 8941360 - SS26)".
const SHIPMENT_HEADER_ALIASES = {
  // simple/generic format
  'season':'season','po':'po','po number':'po','order number':'po',
  'style':'style','style number':'style','colour':'color','color':'color',
  'factory':'factory','company':'company',
  'shipped qty':'shippedQty','shipment qty':'shippedQty','qty':'shippedQty',
  'shipment date':'shipDate','ship date':'shipDate','date':'shipDate',
  // real EMBEE Pre-Alert booking format
  'style#':'style','po#':'po','model':'r3Code','garment color':'colorRaw',
  'item code':'itemCode','size':'size','mpc description':'description',
  'ttl no pcs':'shippedQty',
  'price usd/ pc':'unitPrice','price usd/pc':'unitPrice','price usd per pc':'unitPrice','unit price':'unitPrice',
};
// "DKT-N07A BLACK - (R3 Code: 8941360 - SS26)" -> {color:'DKT-N07A BLACK', season:'SS26'}
function parseGarmentColorField(raw){
  const s = String(raw||'');
  const colorMatch = s.match(/^(.*?)\s*-\s*\(/);
  const color = colorMatch ? colorMatch[1].trim() : s.trim();
  const seasonMatch = s.match(/\b(SS\d{2}|AW\d{2})\b/i);
  const season = seasonMatch ? seasonMatch[1].toUpperCase() : '';
  return {color, season};
}
// Pre-Alert sheet names look like "PREALEART FOR BOOKING-ZARAGOZA" / "PREALEART FORBOOKING ROUVIGNIES" — factory is what's left.
function factoryFromSheetName(name){
  return String(name||'').replace(/pre[\s-]?ale?art/ig,'').replace(/for\s*booking/ig,'').replace(/^[\s\-:]+|[\s\-:]+$/g,'').trim() || name;
}
// The line table rarely carries an explicit date — fall back to a date embedded in the file name,
// e.g. "...WK-30--21-JULY-2026...".
function dateFromFileName(fileName){
  const m = String(fileName||'').match(/(\d{1,2})[\s\-_]?(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*[\s\-_](\d{4})/i);
  if(!m) return '';
  const months = {JAN:'01',FEB:'02',MAR:'03',APR:'04',MAY:'05',JUN:'06',JUL:'07',AUG:'08',SEP:'09',OCT:'10',NOV:'11',DEC:'12'};
  const mon = months[m[2].slice(0,3).toUpperCase()];
  if(!mon) return '';
  return `${m[3]}-${mon}-${String(m[1]).padStart(2,'0')}`;
}
// Turns a normal Google Sheets share/edit link into a CSV export link. Already-published
// "pub?output=csv" links, or any other direct CSV URL, are passed through untouched.
// Exporting the whole workbook (every tab, not just one) lets a multi-factory booking sheet
// work exactly like a multi-tab file upload — no need to hunt down a specific tab's gid.
// Google's own /export download link isn't reachable via cross-origin fetch() from here (no CORS
// headers) — the Visualization API endpoint below IS built for exactly this kind of cross-site
// query and reliably sends the right CORS headers, but it can only return ONE tab per call.
function googleSheetGvizCsvUrl(url, sheetName, gid){
  const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if(!idMatch) return null;
  const params = sheetName ? `sheet=${encodeURIComponent(sheetName)}` : `gid=${gid||'0'}`;
  return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/gviz/tq?tqx=out:csv&${params}`;
}
function googleSheetXlsxExportUrl(url){
  const idMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if(!idMatch) return url; // not a recognizable Sheets URL — try it as-is
  return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=xlsx`;
}
function findShipmentHeaderRow(grid){
  for(let r=0;r<grid.length;r++){
    const row = grid[r]; if(!row) continue;
    const norm = row.map(c=> c==null? '' : String(c).trim().toLowerCase());
    if(norm.includes('style#') || (norm.includes('style') && norm.includes('po'))) return r;
  }
  return -1;
}
function parseShipmentWorkbook(wb, fileName, company){
  const fallbackDate = dateFromFileName(fileName);
  const lines = [];
  wb.SheetNames.forEach(sheetName=>{
    const ws = wb.Sheets[sheetName];
    const grid = XLSX.utils.sheet_to_json(ws, {header:1, defval:null, raw:true});
    if(!grid.length) return;
    const headerRowIdx = findShipmentHeaderRow(grid);
    if(headerRowIdx<0) return; // this sheet isn't a line-item table (e.g. a pure cover sheet) — skip it
    const headerRow = grid[headerRowIdx] || [];
    const colMap = headerRow.map(cell=> cell==null? null : SHIPMENT_HEADER_ALIASES[String(cell).trim().toLowerCase()] || null);
    const sheetFactory = factoryFromSheetName(sheetName);
    for(let r=headerRowIdx+1; r<grid.length; r++){
      const row = grid[r];
      if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
      const rec = {season:'',po:'',style:'',color:'',factory:sheetFactory,company,shippedQty:0,shipDate:fallbackDate,r3Code:'',itemCode:'',size:'',description:'',unitPrice:0};
      colMap.forEach((field,idx)=>{
        if(!field) return;
        const cell = row[idx];
        if(field==='shippedQty') rec.shippedQty = cell==null? 0 : Number(cell)||0;
        else if(field==='unitPrice') rec.unitPrice = cell==null? 0 : Number(cell)||0;
        else if(field==='shipDate') rec.shipDate = cell==null? rec.shipDate : excelDateToISO(cell);
        else if(field==='company') rec.company = cell==null? company : String(cell).trim();
        else if(field==='colorRaw'){ const parsed = parseGarmentColorField(cell); rec.color = parsed.color; if(parsed.season) rec.season = parsed.season; }
        else rec[field] = cell==null? '' : String(cell).trim();
      });
      if(!rec.style) continue;
      lines.push(rec);
    }
  });
  if(!lines.length) throw new Error('No shipment rows found. Expected either Season/PO/Style/Colour/Factory/Shipped Qty headers, or the EMBEE Pre-Alert booking format with a STYLE#, PO# and TTL NO PCS column.');
  return { id:'sh_'+Date.now(), type:'SHIPMENT', company, fileName, uploadedAt:new Date().toISOString(), rowCount:lines.length, lines };
}

// ---------- Shipment Business Summary — WK / Month / Factory / Qty / Value, EMBEE + GLOBE, by year ----------
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function computeShipmentBusinessSummary(shipmentBatches, year){
  const build = (company)=>{
    const months = MONTH_NAMES.map((name,i)=>({month:i+1,name,qty:0,value:0}));
    (shipmentBatches||[]).forEach(b=>{
      if(b.company!==company) return;
      (b.lines||[]).forEach(l=>{
        if(!l.shipDate) return;
        const d = new Date(l.shipDate);
        if(isNaN(d.getTime()) || d.getFullYear()!==year) return;
        const row = months[d.getMonth()];
        row.qty += n(l.shippedQty);
        row.value += n(l.shippedQty)*n(l.unitPrice);
      });
    });
    const totalQty = months.reduce((a,m)=>a+m.qty,0);
    const totalValue = months.reduce((a,m)=>a+m.value,0);
    return {months, totalQty, totalValue};
  };
  const embee = build('EMBEE');
  const globe = build('GLOBE');
  const grandQty = embee.totalQty + globe.totalQty;
  const grandValue = embee.totalValue + globe.totalValue;
  return {embee, globe, grandQty, grandValue};
}
// Flattened rows — mirrors the "Business - 2026" workbook layout exactly, so the same array feeds
// the on-screen table AND the Excel/CSV/PDF export.
function buildBusinessSummaryRows(summary, year){
  const rows = [];
  [['embee','Embee'],['globe','Globe']].forEach(([key,label])=>{
    const s = summary[key];
    s.months.forEach(m=>{
      rows.push({WK:'', Month:`${m.name} ${year}`, Factory:label, 'Qty (Pcs)':m.qty, 'Total Value (US$)':Number(m.value.toFixed(2))});
    });
    rows.push({WK:`Year ${year}`, Month:`Year ${year}`, Factory:`${label} Total`, 'Qty (Pcs)':s.totalQty, 'Total Value (US$)':Number(s.totalValue.toFixed(2))});
    rows.push({WK:'', Month:'', Factory:'', 'Qty (Pcs)':'', 'Total Value (US$)':''});
  });
  rows.push({WK:'', Month:`Year ${year}`, Factory:'Grand Total', 'Qty (Pcs)':summary.grandQty, 'Total Value (US$)':Number(summary.grandValue.toFixed(2))});
  rows.push({WK:'', Month:'', Factory:'', 'Qty (Pcs)':'', 'Total Value (US$)':''});
  rows.push({WK:'', Month:'', Factory:'In Million', 'Qty (Pcs)':Number((summary.grandQty/1e6).toFixed(4)), 'Total Value (US$)':Number((summary.grandValue/1e6).toFixed(4))});
  return rows;
}
function ShipmentBusinessSummarySection({shipmentBatches}){
  const years = useMemo(()=>{
    const set = new Set();
    (shipmentBatches||[]).forEach(b=>(b.lines||[]).forEach(l=>{ if(l.shipDate){ const y=new Date(l.shipDate).getFullYear(); if(!isNaN(y)) set.add(y); } }));
    set.add(new Date().getFullYear());
    return Array.from(set).sort();
  },[shipmentBatches]);
  const [year,setYear] = useState(years[years.length-1]);
  useEffect(()=>{ if(!years.includes(year)) setYear(years[years.length-1]); },[years]); // eslint-disable-line

  if(!shipmentBatches || !shipmentBatches.length){
    return null;
  }
  const summary = computeShipmentBusinessSummary(shipmentBatches, year);
  const rows = buildBusinessSummaryRows(summary, year);

  return (
    <div className="section" style={{marginTop:8}}>
      <div className="section-head">
        <div className="section-title">Shipment Business Summary</div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <select value={year} onChange={e=>setYear(Number(e.target.value))}>
            {years.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <ExportButtons title={`Business - ${year}`} baseFilename={`Business_-_${year}`} rows={rows} />
        </div>
      </div>
      <div className="section-body table-scroll">
        <table>
          <thead><tr><th>WK</th><th>Month</th><th>Factory</th><th style={{textAlign:'right'}}>Qty (Pcs)</th><th style={{textAlign:'right'}}>Total Value (US$)</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>{
              const isTotal = String(r.Factory).includes('Total') || r.Factory==='In Million';
              return (
                <tr key={i} style={isTotal? {fontWeight:700,background:'var(--primary-soft)'} : undefined}>
                  <td>{r.WK}</td><td>{r.Month}</td><td>{r.Factory}</td>
                  <td style={{textAlign:'right'}}>{r['Qty (Pcs)']===''? '' : fmt(r['Qty (Pcs)'])}</td>
                  <td style={{textAlign:'right'}}>{r['Total Value (US$)']===''? '' : r['Total Value (US$)'].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Reproduces, cell for cell, the "DECATHLON SS26 DELIVERYWISE PRIORITY CHART" workbook:
//   Table 1: ACC. ORDERED QTY (weekly) | Orders Received (per PO) | TTL | ACC. BALANCE TO ORDER | FG STOCK
//   Table 2: ACC. ORDERED QTY (mirrors Table 1) | Order Issued to Fty (per batch) | TTL | BALANCE ACC. STOCK | NEED TO ISSUE ORDERS TO FTY
//   KPI strip: TILL NOW ORDERS RECEIVED, SELECTION QTY (130% Spain + %Des commitment), % commitment, ACC. BALANCE TO ORDER
// Excel formula mapping (workbook cell -> field):
//   N4:N10  = J4+K4+L4+M4         -> orderedTotal[size]          (sum of weekly ordered-qty columns)
//   AE4:AE10= SUM(P4:AD4)         -> receivedTotal[size]         (sum across every PO column)
//   AG4:AG10= N4-AE4              -> balanceToOrder[size]
//   AE15:AE21=SUM(P15:AD15)       -> issuedTotal[size]           (sum across every issue-batch column)
//   AG15:AG21=N15-AE15            -> balanceAccStock[size]
//   AH15:AH21=(AE15+AH4)-AE4      -> needToIssue[size] = (issuedTotal + fgStock) - receivedTotal
//   I25=SUM(E6:E29)               -> tillNowReceived  (sum of "Garment Order Qty" across every PO row)
//   I26                           -> selectionQty (130% Spain + %Des commitment target, user input)
//   J25=I25/I26                   -> pctReceived
//   I27=I25-I26                   -> balanceVsCommit
//   I28=N22+AH11                  -> accOrderedQtyKpi = orderedTotal + fgStock totals
//   J28=I28/I26                   -> pctOrdered
//   I29=I28-I26                   -> accBalanceToOrderKpi
// Note: the source workbook re-enters the weekly ordered-qty figure a second time in Table 2
// (J15:J21 duplicates J4:J10 by hand). This system keeps a single input for that figure and
// drives both tables from it — same calculation, one less place to key the same number twice.
const SIZES = ['S','M','L','XL','2XL','3XL','4XL'];
function zeroSizes(){ const o={}; SIZES.forEach(s=>o[s]=0); return o; }
function sizeSum(obj){ return SIZES.reduce((a,s)=>a+(Number(obj[s])||0),0); }
function n(v){ const x=Number(v); return isFinite(x)?x:0; }

// ======================================================================================
// ---------- Shipment Performance module (Decathlon Weekly Shipment Plan + Shipment Details) ----------
// Two independent weekly Excel sources, matched automatically:
//   Data Source 1 — Shipment Plan: one row per PO (Order Number), reissued weekly by Decathlon
//                    with the latest Ordered/Shipped/Delivered qty, CHD/EHD dates & weeks.
//   Data Source 2 — Shipment Details: one row per PO/style/color/size for whatever actually
//                    moved in a given week. It carries no week column itself, so the system
//                    assigns the shipment week = the Tuesday of the week the file is uploaded for.
// Matching key: Iman Code<->STYLE#, Order Number<->PO#, Ordered Qty<->TTL NO PCS (see mapping table).
// ======================================================================================

function normHeader(s){ return String(s==null?'':s).replace(/[\u2013\u2014]/g,'-').replace(/\s+/g,' ').trim().toLowerCase(); }
function findAliasHeaderRow(grid, aliasMap){
  for(let r=0;r<Math.min(grid.length,20);r++){
    const row = grid[r]; if(!row) continue;
    const matches = row.filter(c=> c!=null && aliasMap[normHeader(c)]).length;
    if(matches>=2) return r;
  }
  return -1;
}
// ISO-8601 week helpers — the canonical time axis for every Shipment Performance KPI is the
// *date* (CHD / EHD / shipment-week Tuesday), not the raw "WK.." text a file may also carry.
function mondayOf(d){ const x=new Date(d); const day=(x.getDay()+6)%7; x.setDate(x.getDate()-day); x.setHours(0,0,0,0); return x; }
function tuesdayOfWeek(d){ const mon = mondayOf(d); const tue = new Date(mon); tue.setDate(mon.getDate()+1); return tue; }
function isoDateStr(d){ const x=new Date(d); return isNaN(x)? '' : x.toISOString().slice(0,10); }
function weekNumberOf(d){
  const dt = new Date(Date.UTC(new Date(d).getFullYear(),new Date(d).getMonth(),new Date(d).getDate()));
  const dayNum = dt.getUTCDay()||7;
  dt.setUTCDate(dt.getUTCDate()+4-dayNum);
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(),0,1));
  return Math.ceil((((dt-yearStart)/86400000)+1)/7);
}
function weekLabelOf(d){ return 'WK'+String(weekNumberOf(d)).padStart(2,'0'); }
function weekKeyOf(d){ const x=new Date(d); return isNaN(x)? '' : x.getFullYear()+'-'+weekLabelOf(x); }
function daysBetween(a,b){ return Math.round((new Date(a)-new Date(b))/86400000); }

// ---------- parsing: Data Source 1 — Decathlon Weekly Shipment Plan ----------
const SHIPMENT_PLAN_ALIASES = {
  'old order number':'orderNumber','order number':'orderNumber',
  'model':'model','iman code':'imanCode',
  'ordered qty':'orderedQty','shipped qty':'shippedQtyPlan','delivered qty':'deliveredQty',
  'remaining quantity':'remainingQtyPlan','remaining qty':'remainingQtyPlan',
  'ehd week':'ehdWeek','ehd - supplier handover date':'ehdDate',
  'chd week':'chdWeek','chd - contractual handover date':'chdDate',
  'season':'season','rsd - real shipment date':'rsdDate',
  'order amount':'orderAmount','purchase price':'purchasePrice',
  'supplier / subcontractor':'supplier','supplier/subcontractor':'supplier','supplier subcontractor':'supplier',
  'edd - expected delivery date':'eddDate','cdd - contractual delivery date':'cddDate',
  'lhd - last handover date':'lhdDate','delay reason':'delayReason','delay responsible':'delayResponsible',
};
const SHIPMENT_PLAN_NUM_FIELDS = ['orderedQty','shippedQtyPlan','deliveredQty','remainingQtyPlan','orderAmount','purchasePrice'];
const SHIPMENT_PLAN_DATE_FIELDS = ['ehdDate','chdDate','rsdDate','eddDate','cddDate','lhdDate'];
function parseShipmentPlanWorkbook(wb, fileName){
  let best = null;
  wb.SheetNames.forEach(sheetName=>{
    const ws = wb.Sheets[sheetName];
    const grid = XLSX.utils.sheet_to_json(ws,{header:1,defval:null,raw:true});
    if(!grid.length) return;
    const headerRowIdx = findAliasHeaderRow(grid, SHIPMENT_PLAN_ALIASES);
    if(headerRowIdx<0) return;
    const headerRow = grid[headerRowIdx];
    const colMap = headerRow.map(c=> c==null?null:SHIPMENT_PLAN_ALIASES[normHeader(c)]||null);
    const rows = [];
    for(let r=headerRowIdx+1;r<grid.length;r++){
      const row = grid[r];
      if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
      const rec = {orderNumber:'',model:'',imanCode:'',orderedQty:0,shippedQtyPlan:0,deliveredQty:0,remainingQtyPlan:0,
        ehdWeek:'',ehdDate:null,chdWeek:'',chdDate:null,season:'',rsdDate:null,orderAmount:0,purchasePrice:0,
        supplier:'',eddDate:null,cddDate:null,lhdDate:null,delayReason:'',delayResponsible:''};
      colMap.forEach((field,idx)=>{
        if(!field) return;
        const cell = row[idx];
        if(SHIPMENT_PLAN_NUM_FIELDS.includes(field)) rec[field] = cell==null?0:Number(cell)||0;
        else if(SHIPMENT_PLAN_DATE_FIELDS.includes(field)) rec[field] = cell==null?null:excelDateToISO(cell);
        else rec[field] = cell==null?'':String(cell).trim();
      });
      if(!rec.orderNumber) continue;
      // The plan sheet sometimes carries the style identity only under "Model" — fall back to it
      // so the Iman Code<->STYLE# match still works.
      if(!rec.imanCode && rec.model) rec.imanCode = rec.model;
      rows.push(rec);
    }
    if(rows.length && (!best || rows.length>best.rows.length)) best = {rows};
  });
  if(!best) throw new Error('No shipment plan rows found. Expected columns like Order Number, Model / Iman Code, Ordered Qty, Shipped Qty, CHD Week, CHD – Contractual Handover Date, Supplier / Subcontractor, etc.');
  return { id:'splan_'+Date.now(), type:'SHIPMENT_PLAN', fileName, uploadedAt:new Date().toISOString(), rowCount:best.rows.length, rows:best.rows };
}

// ---------- parsing: Data Source 2 — Shipment Details ----------
const SHIPMENT_DETAILS_ALIASES = {
  'group':'group','mpc description':'mpcDescription','item code':'itemCode','garment color':'garmentColor',
  'style #':'styleNo','style#':'styleNo',
  'po #':'po','po#':'po',
  'size':'size','pcs per carton':'pcsPerCarton','total cartons':'totalCartons','total pcs':'totalPcs',
  'price usd / pc':'priceUsdPc','price usd/pc':'priceUsdPc','total price in usd':'totalPriceUsd',
  'cbm':'cbm','gross weight / carton':'grossWeightCarton','gross weight/carton':'grossWeightCarton',
  'net weight / carton':'netWeightCarton','net weight/carton':'netWeightCarton',
  'total gross weight':'totalGrossWeight','total net weight':'totalNetWeight','fabric supplier':'fabricSupplier',
};
const SHIPMENT_DETAILS_NUM_FIELDS = ['pcsPerCarton','totalCartons','totalPcs','priceUsdPc','totalPriceUsd','cbm','grossWeightCarton','netWeightCarton','totalGrossWeight','totalNetWeight'];
// shipmentWeekDate: the Tuesday (Date object) this upload represents — see the Weekly Matching
// Logic business rule. Defaults to the Tuesday of the current week but is adjustable in the UI
// so a file can be logged against the week it was actually issued for.
function parseShipmentDetailsWorkbook(wb, fileName, shipmentWeekDate){
  let best = null;
  wb.SheetNames.forEach(sheetName=>{
    const ws = wb.Sheets[sheetName];
    const grid = XLSX.utils.sheet_to_json(ws,{header:1,defval:null,raw:true});
    if(!grid.length) return;
    const headerRowIdx = findAliasHeaderRow(grid, SHIPMENT_DETAILS_ALIASES);
    if(headerRowIdx<0) return;
    const headerRow = grid[headerRowIdx];
    const colMap = headerRow.map(c=> c==null?null:SHIPMENT_DETAILS_ALIASES[normHeader(c)]||null);
    const rows = [];
    for(let r=headerRowIdx+1;r<grid.length;r++){
      const row = grid[r];
      if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
      const rec = {group:'',mpcDescription:'',itemCode:'',garmentColor:'',styleNo:'',po:'',size:'',
        pcsPerCarton:0,totalCartons:0,totalPcs:0,priceUsdPc:0,totalPriceUsd:0,cbm:0,
        grossWeightCarton:0,netWeightCarton:0,totalGrossWeight:0,totalNetWeight:0,fabricSupplier:''};
      colMap.forEach((field,idx)=>{
        if(!field) return;
        const cell = row[idx];
        if(SHIPMENT_DETAILS_NUM_FIELDS.includes(field)) rec[field] = cell==null?0:Number(cell)||0;
        else rec[field] = cell==null?'':String(cell).trim();
      });
      if(!rec.po) continue;
      rows.push(rec);
    }
    if(rows.length && (!best || rows.length>best.rows.length)) best = {rows};
  });
  if(!best) throw new Error('No shipment detail rows found. Expected columns like Style#, PO#, Size, Total Cartons, Total PCS, Price USD/PC, Total Price in USD, etc.');
  const tue = tuesdayOfWeek(shipmentWeekDate||new Date());
  return {
    id:'sdet_'+Date.now(), type:'SHIPMENT_DETAILS', fileName, uploadedAt:new Date().toISOString(),
    shipmentWeek: isoDateStr(tue), weekLabel: weekLabelOf(tue), weekKey: weekKeyOf(tue),
    rowCount:best.rows.length, rows:best.rows,
  };
}

// ---------- Matching + comparison engine ----------
// Builds one record per PO (Order Number / PO#), merging the latest Shipment Plan revision for
// that PO with every Shipment Details week that touched it.
function computeShipmentPerformanceRecords(planBatches, detailsBatches){
  const planByOrder = {};
  (planBatches||[]).slice().sort((a,b)=>new Date(a.uploadedAt)-new Date(b.uploadedAt)).forEach(b=>{
    b.rows.forEach(r=>{ planByOrder[r.orderNumber] = r; }); // later batches overwrite — latest plan wins
  });
  const detailsByOrder = {};
  (detailsBatches||[]).slice().sort((a,b)=>new Date(a.shipmentWeek)-new Date(b.shipmentWeek)).forEach(b=>{
    const byPoInBatch = {};
    b.rows.forEach(r=>{
      if(!r.po) return;
      if(!byPoInBatch[r.po]) byPoInBatch[r.po] = {po:r.po, styleNo:r.styleNo, totalPcs:0,totalCartons:0,totalPriceUsd:0,totalGrossWeight:0,totalNetWeight:0,cbm:0};
      const agg = byPoInBatch[r.po];
      agg.totalPcs += r.totalPcs||0; agg.totalCartons += r.totalCartons||0; agg.totalPriceUsd += r.totalPriceUsd||0;
      agg.totalGrossWeight += r.totalGrossWeight||0; agg.totalNetWeight += r.totalNetWeight||0; agg.cbm += r.cbm||0;
    });
    Object.values(byPoInBatch).forEach(agg=>{
      (detailsByOrder[agg.po] = detailsByOrder[agg.po]||[]).push({batchId:b.id, shipmentWeek:b.shipmentWeek, weekLabel:b.weekLabel, ...agg});
    });
  });

  const today = new Date();
  const allPOs = new Set([...Object.keys(planByOrder), ...Object.keys(detailsByOrder)]);
  const records = [];
  allPOs.forEach(po=>{
    const plan = planByOrder[po] || null;
    const weeks = (detailsByOrder[po]||[]).slice().sort((a,b)=>new Date(a.shipmentWeek)-new Date(b.shipmentWeek));
    const actualShippedQty = weeks.reduce((s,w)=>s+w.totalPcs,0);
    const lastWeek = weeks.length? weeks[weeks.length-1] : null;
    const orderedQty = plan? plan.orderedQty : (weeks.length? actualShippedQty : 0); // unmatched detail-only PO
    const chdDate = plan? plan.chdDate : null;
    const ehdDate = plan? plan.ehdDate : null;
    const remainingQty = Math.max(orderedQty - actualShippedQty, 0);
    const shipmentCompletionPct = orderedQty>0 ? Math.min(actualShippedQty/orderedQty*100,999) : (actualShippedQty>0? 100:0);
    const delayDays = (chdDate && lastWeek) ? daysBetween(lastWeek.shipmentWeek, chdDate) : null;
    const onTime = delayDays!=null && delayDays<=0;
    const ehdDelayDays = (ehdDate && lastWeek) ? daysBetween(lastWeek.shipmentWeek, ehdDate) : null;
    // Decathlon HOT methodology: delta = (AHD if shipped, else EHD as a projection) − CHD, in days.
    const ahdOrEhd = lastWeek ? lastWeek.shipmentWeek : ehdDate;
    const hotDelayDays = (chdDate && ahdOrEhd) ? daysBetween(ahdOrEhd, chdDate) : null;
    let status;
    if(actualShippedQty<=0){
      status = (chdDate && new Date(chdDate)<today) ? 'NOT_SHIPPED_LATE' : 'PENDING';
    } else if(orderedQty>0 && actualShippedQty < orderedQty){
      status = (chdDate && new Date(chdDate)<today) ? 'DELAYED_PARTIAL' : 'PARTIAL';
    } else {
      status = onTime ? 'ON_TIME' : 'DELAYED';
    }
    records.push({
      po, plan, imanCode: plan? plan.imanCode : (weeks[0]&&weeks[0].styleNo)||'',
      styleNo: (weeks[0]&&weeks[0].styleNo) || (plan&&plan.imanCode) || '',
      season: plan? plan.season : '', factory: plan? plan.supplier : 'Unspecified',
      orderedQty, actualShippedQty, remainingQty, shipmentCompletionPct,
      chdWeek: plan? plan.chdWeek : '', chdDate, ehdWeek: plan? plan.ehdWeek : '', ehdDate,
      lastShipmentDate: lastWeek? lastWeek.shipmentWeek : null, lastShipmentWeekLabel: lastWeek? lastWeek.weekLabel : '',
      weeks, delayDays, ehdDelayDays, hotDelayDays, onTime, status,
      delayReason: plan? plan.delayReason : '', delayResponsible: plan? plan.delayResponsible : '',
      orderAmount: plan? plan.orderAmount : 0, purchasePrice: plan? plan.purchasePrice: 0,
    });
  });
  return records.sort((a,b)=> (b.delayDays||-999)-(a.delayDays||-999));
}

const LATE_STATUSES = ['DELAYED','NOT_SHIPPED_LATE','DELAYED_PARTIAL'];
// KPI + trend engine. "Due" week = the PO's CHD week; "actual" week = the Tuesday of the
// Shipment Details upload that most recently moved qty against that PO.
function computeShipmentPerformanceKpis(records){
  const today = new Date();
  function hotForWeekKey(wk){
    const due = records.filter(r=>r.chdDate && weekKeyOf(r.chdDate)===wk);
    if(!due.length) return null;
    const onTime = due.filter(r=>r.onTime).length;
    return {pct:onTime/due.length*100, due:due.length, onTime};
  }
  function ehdForWeekKey(wk){
    const due = records.filter(r=>r.ehdDate && weekKeyOf(r.ehdDate)===wk && r.lastShipmentDate);
    if(!due.length) return null;
    const reliable = due.filter(r=>r.ehdDelayDays!=null && r.ehdDelayDays<=14).length;
    return {pct:reliable/due.length*100, due:due.length, reliable};
  }
  const currentWeekKey = weekKeyOf(today);
  const prevWeekDate = new Date(today); prevWeekDate.setDate(prevWeekDate.getDate()-7);
  const prevWeekKey = weekKeyOf(prevWeekDate);
  const currentHot = hotForWeekKey(currentWeekKey);
  const prevHot = hotForWeekKey(prevWeekKey);

  const ehdRecs = records.filter(r=>r.ehdDate && r.lastShipmentDate);
  const ehdReliable = ehdRecs.filter(r=>r.ehdDelayDays!=null && r.ehdDelayDays<=14);
  const ehdReliabilityPct = ehdRecs.length? ehdReliable.length/ehdRecs.length*100 : null;

  const lateRecords = records.filter(r=>LATE_STATUSES.includes(r.status));
  const totalLatePOs = lateRecords.length;
  const totalLateQty = lateRecords.reduce((s,r)=> s + (r.status==='NOT_SHIPPED_LATE'? r.orderedQty : Math.max(r.orderedQty-r.actualShippedQty,0)) ,0);

  const top10Delayed = records.filter(r=>LATE_STATUSES.includes(r.status)).slice(0,10);

  const factoryMap = {};
  records.forEach(r=>{
    const f = r.factory || 'Unspecified';
    if(!factoryMap[f]) factoryMap[f] = {factory:f, due:0, onTime:0, ehdDue:0, ehdReliable:0, poCount:0};
    factoryMap[f].poCount++;
    if(r.chdDate){ factoryMap[f].due++; if(r.onTime) factoryMap[f].onTime++; }
    if(r.ehdDate && r.lastShipmentDate){ factoryMap[f].ehdDue++; if(r.ehdDelayDays!=null && r.ehdDelayDays<=14) factoryMap[f].ehdReliable++; }
  });
  const factoryRows = Object.values(factoryMap)
    .map(f=>({...f, hotPct: f.due? f.onTime/f.due*100 : null, ehdPct: f.ehdDue? f.ehdReliable/f.ehdDue*100 : null}))
    .sort((a,b)=>b.poCount-a.poCount);

  const trend = [];
  for(let i=11;i>=0;i--){
    const d = new Date(today); d.setDate(d.getDate()-7*i);
    const wk = weekKeyOf(d);
    const hot = hotForWeekKey(wk);
    const ehd = ehdForWeekKey(wk);
    trend.push({weekKey:wk, weekLabel:weekLabelOf(d), hotPct: hot? hot.pct:null, hotDue: hot?hot.due:0, ehdPct: ehd? ehd.pct:null, ehdDue: ehd?ehd.due:0});
  }

  return {currentHot, prevHot, ehdReliabilityPct, ehdRecsCount:ehdRecs.length, totalLatePOs, totalLateQty, top10Delayed, factoryRows, trend};
}

// Decathlon's official HOT methodology (per their KPI definition):
//  - HOT On Time Realized:      -4 <= (AHD or EHD) - CHD <= +4 days
//  - HOT On Time + Adv Realized:      (AHD or EHD) - CHD <= +4 days   (early/advance shipments always count)
//  - "WK" = the figure for week N-2 (data needs 2 weeks to settle before being reported)
//  - "YTD" = cumulative from week 1 through week N-2 of the same year
//  - Arrow: green if WK/YTD improved vs the equivalent figure one week earlier, red if it dropped
function computeHotKpis(records){
  const today = new Date();
  const targetDate = new Date(today); targetDate.setDate(targetDate.getDate()-14); // week N-2
  const targetWeekKey = weekKeyOf(targetDate);
  const targetYear = new Date(targetDate).getFullYear();
  const targetWeekNum = weekNumberOf(targetDate);
  const prevWeekDate = new Date(targetDate); prevWeekDate.setDate(prevWeekDate.getDate()-7);
  const prevWeekKey = weekKeyOf(prevWeekDate);

  const withDelta = records.filter(r=>r.chdDate && r.hotDelayDays!=null);
  const passes = (r,mode)=> mode==='strict' ? (r.hotDelayDays<=4 && r.hotDelayDays>=-4) : (r.hotDelayDays<=4);

  function statsForWeekKey(wk,mode){
    const due = withDelta.filter(r=>weekKeyOf(r.chdDate)===wk);
    if(!due.length) return null;
    const onTime = due.filter(r=>passes(r,mode)).length;
    return {pct:onTime/due.length*100, due:due.length, onTime};
  }
  function statsYtdThrough(weekNum,year,mode){
    const due = withDelta.filter(r=>{
      const d = new Date(r.chdDate);
      return d.getFullYear()===year && weekNumberOf(d)>=1 && weekNumberOf(d)<=weekNum;
    });
    if(!due.length || weekNum<1) return null;
    const onTime = due.filter(r=>passes(r,mode)).length;
    return {pct:onTime/due.length*100, due:due.length, onTime};
  }

  function bundle(mode){
    return {
      wk: statsForWeekKey(targetWeekKey,mode),
      wkPrev: statsForWeekKey(prevWeekKey,mode),
      ytd: statsYtdThrough(targetWeekNum,targetYear,mode),
      ytdPrev: statsYtdThrough(targetWeekNum-1,targetYear,mode),
    };
  }

  return {
    weekLabel: weekLabelOf(targetDate), weekKey: targetWeekKey, target: 95,
    realized: bundle('strict'), adv: bundle('adv'),
  };
}


function blankStyleMeta(){
  return {
    season:'', buyer:'', color:'', factory:'', country:'', department:'', productionLine:'',
    brand:'', supplier:'', fabricSupplier:'', accessoriesSupplier:'', company:'',
    smtCommitmentPct:0, fabricCommitmentQty:0, fabricOrderedQty:0,
    accCommitmentPct:0, accCommitmentQty:0,
    prevSeasonFgStock:0, productionCompletedQty:0, shipmentCompletedQty:0,
  };
}
function seedAccessoryStyles(){
  return [{
    id:'st_346523', styleNo:'346523',
    description:'TS RUN 100 M 2026 - - DKT-N00A WHITE',
    r3Code:'9030973', selectionQty:69000,
    ...blankStyleMeta(),
    season:'SS26', buyer:'Decathlon', color:'White', factory:'CAC ROUVIGNIES', country:'France',
    department:'Running', productionLine:'Line 3', brand:'Kalenji', supplier:'CAC ROUVIGNIES',
    fabricSupplier:'Textra SA', accessoriesSupplier:'EMBEE Accessories',
    smtCommitmentPct:130, fabricCommitmentQty:72000, fabricOrderedQty:70500,
    accCommitmentPct:100, accCommitmentQty:69000,
    prevSeasonFgStock:5200, productionCompletedQty:9800, shipmentCompletedQty:4200,
    weeks:[{id:'wk_08',label:'WK08',qty:{S:4000,M:4400,L:4000,XL:2600,'2XL':0,'3XL':0,'4XL':0}}],
    pos:[
      {id:'po_1',poNumber:'4524347980',deliveredThird:'CAC ROUVIGNIES',ehd:'2026-05-05',garmentOrderQty:12119,
        received:{S:3159,M:3164,L:3164,XL:2632,'2XL':0,'3XL':0,'4XL':0}},
      {id:'po_2',poNumber:'4524380882',deliveredThird:'CAC ROUVIGNIES',ehd:'2026-05-12',garmentOrderQty:2909,
        received:{S:837,M:1232,L:840,XL:0,'2XL':0,'3XL':0,'4XL':0}},
    ],
    fgStock:zeroSizes(),
    issues:[{id:'is_1',label:'1st Order',qty:{S:4000,M:4400,L:4000,XL:2600,'2XL':0,'3XL':0,'4XL':0}}],
  }];
}

function computeStyleCalc(style){
  const orderedTotal=zeroSizes(), receivedTotal=zeroSizes(), balanceToOrder=zeroSizes();
  const issuedTotal=zeroSizes(), balanceAccStock=zeroSizes(), needToIssue=zeroSizes();
  SIZES.forEach(s=>{
    orderedTotal[s] = style.weeks.reduce((a,w)=>a+n(w.qty[s]),0);                    // N (table 1 & 2)
    receivedTotal[s] = style.pos.reduce((a,p)=>a+n(p.received[s]),0);                 // AE (table 1)
    balanceToOrder[s] = orderedTotal[s]-receivedTotal[s];                             // AG (table 1)
    issuedTotal[s] = style.issues.reduce((a,is)=>a+n(is.qty[s]),0);                   // AE (table 2)
    balanceAccStock[s] = orderedTotal[s]-issuedTotal[s];                              // AG (table 2)
    needToIssue[s] = (issuedTotal[s]+n(style.fgStock[s])) - receivedTotal[s];         // AH (table 2)
  });
  const totals = {
    ordered:sizeSum(orderedTotal), received:sizeSum(receivedTotal), balanceToOrder:sizeSum(balanceToOrder),
    fgStock:sizeSum(style.fgStock), issued:sizeSum(issuedTotal), balanceAccStock:sizeSum(balanceAccStock), needToIssue:sizeSum(needToIssue),
  };
  const tillNowReceived = style.pos.reduce((a,p)=>a+n(p.garmentOrderQty),0);          // I25
  const selectionQty = n(style.selectionQty);                                          // I26
  const pctReceived = selectionQty? tillNowReceived/selectionQty : 0;                  // J25
  const balanceVsCommit = tillNowReceived - selectionQty;                              // I27
  const accOrderedQtyKpi = totals.ordered + totals.fgStock;                            // I28 = N22+AH11
  const pctOrdered = selectionQty? accOrderedQtyKpi/selectionQty : 0;                  // J28
  const accBalanceToOrderKpi = accOrderedQtyKpi - selectionQty;                        // I29
  return {orderedTotal,receivedTotal,balanceToOrder,issuedTotal,balanceAccStock,needToIssue,totals,
    kpi:{tillNowReceived,selectionQty,pctReceived,balanceVsCommit,accOrderedQtyKpi,pctOrdered,accBalanceToOrderKpi}};
}

// ---------- Shipment linking — matches booking lines to a style via Style + Colour + Factory + Company ----------
function styleShipmentLines(style, shipmentBatches){
  const out = [];
  const contains = (a,b)=>{ // case-insensitive "either contains the other" — tolerates "ROUVIGNIES" vs "CAC ROUVIGNIES"
    if(!a || !b) return true;
    const A=String(a).toLowerCase(), B=String(b).toLowerCase();
    return A.includes(B) || B.includes(A);
  };
  (shipmentBatches||[]).forEach(b=>{
    (b.lines||[]).forEach(l=>{
      const styleMatches = (style.styleNo && l.style && String(l.style)===String(style.styleNo))
        || (style.r3Code && l.r3Code && String(l.r3Code)===String(style.r3Code));
      const colorMatches = contains(style.color, l.color);
      const factoryMatches = contains(style.factory, l.factory);
      const companyMatches = contains(style.company, l.company);
      if(styleMatches && colorMatches && factoryMatches && companyMatches) out.push(l);
    });
  });
  return out;
}
function computeStyleShipment(style, shipmentBatches, totalDemand){
  const lines = styleShipmentLines(style, shipmentBatches);
  const totalShippedQty = lines.reduce((a,l)=>a+n(l.shippedQty),0);
  const dates = lines.map(l=>l.shipDate).filter(Boolean).sort();
  const today = new Date().toISOString().slice(0,10);
  const pastDates = dates.filter(d=>d<=today);
  const futureDates = dates.filter(d=>d>today);
  const lastShipmentDate = pastDates.length? pastDates[pastDates.length-1] : (dates.length? dates[dates.length-1] : '');
  const nextShipmentDate = futureDates.length? futureDates[0] : '';
  const balanceToShip = totalDemand - totalShippedQty;
  const shipmentPct = totalDemand? totalShippedQty/totalDemand : 0;
  return {totalShippedQty, balanceToShip, shipmentPct, lastShipmentDate, nextShipmentDate};
}

// ---------- Style-level planning summary — feeds the Accessories page KPI cards (ONE style at a time) ----------
// Cross-references firm-order lines (Iman Code -> style.r3Code, or Model -> style.styleNo) to derive
// garment demand figures; everything else comes from the style record + its accessory calc.
function computeStyleSummary(style, firmOrderBatches, calc, shipmentBatches){
  let firmOrderQty=0, firmDeliveredQty=0, firmRemainingQty=0;
  (firmOrderBatches||[]).forEach(b=>{
    (b.lines||[]).forEach(l=>{
      const matches = (style.r3Code && l.imanCode && String(l.imanCode)===String(style.r3Code))
        || (style.styleNo && l.model && String(l.model)===String(style.styleNo));
      if(matches){
        firmOrderQty += n(l.orderQty);
        firmDeliveredQty += n(l.deliveredQty);
        firmRemainingQty += n(l.remainingQty);
      }
    });
  });
  const totalFirmOrdersReceived = firmDeliveredQty;
  // Balance = Selection Qty - Firm Orders Received
  const balanceOrdersToReceive = n(style.selectionQty) - totalFirmOrdersReceived;
  const prevSeasonFgStock = n(style.prevSeasonFgStock);
  // Need New Production = Firm Orders Received - Previous Season FG Stock
  const needNewProduction = totalFirmOrdersReceived - prevSeasonFgStock;
  const accessoriesOrdered = calc.kpi.accOrderedQtyKpi;
  const accessoriesReceived = calc.totals.received;
  const accessoriesIssued = calc.totals.issued;
  const warehouseBalance = calc.totals.balanceAccStock;
  const factoryBalance = Math.max(0, calc.totals.issued - n(style.productionCompletedQty));
  const needToPurchase = Math.max(0, -calc.kpi.accBalanceToOrderKpi);
  const productionCompleted = n(style.productionCompletedQty);
  const shipmentCompleted = n(style.shipmentCompletedQty);
  const totalDemand = firmOrderQty || n(style.selectionQty);
  const shipment = computeStyleShipment(style, shipmentBatches, totalDemand);
  let status='Ready';
  if(needToPurchase>0) status='Critical';
  else if(calc.totals.needToIssue>0) status='Attention';
  return {
    totalFirmOrdersReceived, balanceOrdersToReceive,
    prevSeasonFgStock, needNewProduction,
    accessoriesOrdered, accessoriesReceived, accessoriesIssued, warehouseBalance, factoryBalance, needToPurchase,
    productionCompleted, shipmentCompleted, status, shipment,
  };
}
function PlanningStatusPill({status}){
  const cls = status==='Ready' ? 'FIRMED' : status==='Attention' ? 'PARTIAL_FIRM' : 'OUT_OF_FORECAST';
  return <span className={"pill "+cls}><span className="pill-dot"></span>{status}</span>;
}

// ---------- PO Excel upload (size-wise) — feeds the "Orders Received" columns of Table 1 ----------
// Accepted headers (case/space-insensitive, aliases supported):
//   PO Number | PO# | Order Number   -> poNumber
//   Delivered Third | Factory | Supplier -> deliveredThird
//   EHD | EHD Date                   -> ehd
//   Garment Order Qty | Order Qty | Total Qty -> garmentOrderQty (computed from size columns if omitted)
//   S, M, L, XL, 2XL/XXL, 3XL/XXXL, 4XL/XXXXL -> received[size]
const PO_HEADER_ALIASES = {
  'po number':'poNumber','po#':'poNumber','po no':'poNumber','po no.':'poNumber','order number':'poNumber','order no':'poNumber',
  'delivered third':'deliveredThird','delivered third party':'deliveredThird','factory':'deliveredThird','supplier':'deliveredThird','vendor':'deliveredThird',
  'ehd':'ehd','ehd date':'ehd','ehd - supplier handover date':'ehd',
  'garment order qty':'garmentOrderQty','order qty':'garmentOrderQty','total qty':'garmentOrderQty','ordered qty':'garmentOrderQty',
};
const SIZE_HEADER_ALIASES = {'xxl':'2XL','xxxl':'3XL','xxxxl':'4XL'};
function normalizePOHeader(cell){
  if(cell==null) return null;
  const key = String(cell).trim().toLowerCase();
  if(PO_HEADER_ALIASES[key]) return {kind:'field',name:PO_HEADER_ALIASES[key]};
  const sizeKey = SIZE_HEADER_ALIASES[key] || String(cell).trim().toUpperCase();
  if(SIZES.includes(sizeKey)) return {kind:'size',name:sizeKey};
  return null;
}
function excelDateToISO(v){
  if(v==null || v==='') return '';
  if(v instanceof Date) return v.toISOString().slice(0,10);
  if(typeof v==='number'){ const d = XLSX.SSF.parse_date_code(v); if(d) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`; }
  const s = String(v).trim();
  const d2 = new Date(s);
  return isNaN(d2) ? s : d2.toISOString().slice(0,10);
}
function parsePOUploadWorkbook(wb){
  const ws = wb.Sheets[wb.SheetNames[0]];
  const grid = XLSX.utils.sheet_to_json(ws,{header:1,defval:null,raw:true});
  if(!grid.length) throw new Error('The sheet is empty.');
  let headerRowIdx = 0;
  while(headerRowIdx<grid.length && (!grid[headerRowIdx] || grid[headerRowIdx].every(c=>c==null||String(c).trim()===''))) headerRowIdx++;
  const headerRow = grid[headerRowIdx] || [];
  const colMap = headerRow.map(normalizePOHeader);
  if(!colMap.some(c=>c && c.kind==='field' && c.name==='poNumber')){
    throw new Error('No "PO Number" column found. Expected headers like PO Number, Delivered Third, EHD, Garment Order Qty, and one column per size (S, M, L, XL, 2XL, 3XL, 4XL).');
  }
  const rows = [];
  for(let r=headerRowIdx+1; r<grid.length; r++){
    const row = grid[r];
    if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
    const rec = {poNumber:'',deliveredThird:'',ehd:'',garmentOrderQty:null,received:zeroSizes()};
    colMap.forEach((c,idx)=>{
      if(!c) return;
      const cell = row[idx];
      if(c.kind==='field'){
        if(c.name==='ehd') rec.ehd = excelDateToISO(cell);
        else if(c.name==='garmentOrderQty') rec.garmentOrderQty = cell==null? null : Number(cell)||0;
        else rec[c.name] = cell==null? '' : String(cell).trim();
      } else {
        rec.received[c.name] = cell==null? 0 : Number(cell)||0;
      }
    });
    if(!rec.poNumber) continue;
    if(rec.garmentOrderQty==null) rec.garmentOrderQty = sizeSum(rec.received);
    rows.push(rec);
  }
  if(!rows.length) throw new Error('No PO rows found under the header row — check the file has data below the headers.');
  return rows;
}
function downloadPOTemplate(){
  const headers = ['PO Number','Delivered Third','EHD','Garment Order Qty',...SIZES];
  const example = ['4524347980','CAC ROUVIGNIES','2026-05-05',12119,3159,3164,3164,2632,0,0,0];
  const wsData = [headers, example];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PO Upload');
  XLSX.writeFile(wb, 'PO_upload_template.xlsx');
}
function computeComparison(forecastBatches, firmOrderBatches){
  // "latest" forecast qty per item = sum across all weeks in the most recent forecast batch
  const latestForecast = forecastBatches[forecastBatches.length-1];
  const latestFirm = firmOrderBatches[firmOrderBatches.length-1];
  const fcByItem = {}, fcMeta = {};
  if(latestForecast){
    for(const l of latestForecast.lines){
      fcByItem[l.itemCode] = (fcByItem[l.itemCode]||0) + l.forecastQty;
      fcMeta[l.itemCode] = l;
    }
  }
  const firmByItem = {}, firmMeta = {};
  if(latestFirm){
    for(const l of latestFirm.lines){
      firmByItem[l.itemCode] = (firmByItem[l.itemCode]||0) + l.orderQty;
      firmMeta[l.itemCode] = l;
    }
  }
  const allItems = new Set([...Object.keys(fcByItem), ...Object.keys(firmByItem)]);
  const rows = [];
  for(const itemCode of allItems){
    const forecastQty = fcByItem[itemCode]||0;
    const firmQty = firmByItem[itemCode]||0;
    const diff = firmQty - forecastQty;
    const pct = forecastQty>0 ? (diff/forecastQty*100) : (firmQty>0? 100: 0);
    let status;
    if(firmQty===0 && forecastQty>0) status='FORECAST_PENDING';
    else if(firmQty>0 && forecastQty===0) status='OUT_OF_FORECAST';
    else if(firmQty>forecastQty) status='UNEXPECTED_ORDER';
    else if(firmQty>0 && firmQty<forecastQty) status='PARTIAL_FIRM';
    else if(firmQty===forecastQty && firmQty>0) status='FIRMED';
    else status='FORECAST_PENDING';
    const meta = fcMeta[itemCode]||{};
    const fmeta = firmMeta[itemCode]||{};
    rows.push({
      itemCode, forecastQty, firmQty, diff, pct, status,
      model: meta.model||fmeta.model||'',
      modelName: meta.modelName||meta.itemName||'',
      size: fmeta.size||'',
      imanCc: meta.ccCode||fmeta.imanCode||'',
      ehd: fmeta.ehd||null,
    });
  }
  rows.sort((a,b)=>Math.abs(b.diff)-Math.abs(a.diff));
  return rows;
}

// groups a flat comparison array into CC -> Model -> Item Code -> [rows]
function groupComparison(comparisonData){
  return comparisonData.reduce((acc, row) => {
    const cc = row.imanCc || 'N/A';
    const model = row.model || 'N/A';
    const item = row.itemCode || 'N/A';

    if (!acc[cc]) acc[cc] = {};
    if (!acc[cc][model]) acc[cc][model] = {};
    if (!acc[cc][model][item]) acc[cc][model][item] = [];

    acc[cc][model][item].push(row);
    return acc;
  }, {});
}

// rolls up qty/status stats for a set of rows, used at every level of the tree
function summarizeRows(rows){
  const forecastQty = rows.reduce((s,r)=>s+r.forecastQty,0);
  const firmQty = rows.reduce((s,r)=>s+r.firmQty,0);
  const diff = firmQty - forecastQty;
  const statusCounts = {};
  for(const r of rows) statusCounts[r.status] = (statusCounts[r.status]||0)+1;
  return {forecastQty, firmQty, diff, itemCount: rows.length, statusCounts};
}

// ---------- weekly execution matrix (dashboard) ----------
// Groups the latest firm-order batch by EHD week and pairs each week with the
// item-level forecast totals (first batch = "original", latest batch = "latest revised").
function computeWeeklyMatrix(forecastBatches, firmOrderBatches){
  const latestFirm = firmOrderBatches[firmOrderBatches.length-1];
  if(!latestFirm) return [];
  const firstForecast = forecastBatches[0];
  const latestForecast = forecastBatches[forecastBatches.length-1];
  const origByItem = {}, latestByItem = {};
  if(firstForecast) for(const l of firstForecast.lines) origByItem[l.itemCode]=(origByItem[l.itemCode]||0)+l.forecastQty;
  if(latestForecast) for(const l of latestForecast.lines) latestByItem[l.itemCode]=(latestByItem[l.itemCode]||0)+l.forecastQty;

  const weeks = {};
  for(const l of latestFirm.lines){
    const wk = (l.orderMeta && l.orderMeta.ehdWeek) || 'Unscheduled';
    if(!weeks[wk]) weeks[wk] = {ehdWeek:wk, originalForecastQty:0, latestForecastQty:0, firmDroppedQty:0, receivedWarehouseQty:0, issuedFactoryQty:0, balancePendingQty:0, seenItems:new Set()};
    const w = weeks[wk];
    w.firmDroppedQty += l.orderQty;
    w.receivedWarehouseQty += l.deliveredQty;
    w.issuedFactoryQty += l.shippedQty;
    w.balancePendingQty += l.remainingQty;
    if(!w.seenItems.has(l.itemCode)){
      w.seenItems.add(l.itemCode);
      w.originalForecastQty += origByItem[l.itemCode]||0;
      w.latestForecastQty += latestByItem[l.itemCode]||0;
    }
  }
  return Object.values(weeks)
    .map(w=>({
      ehdWeek:w.ehdWeek, originalForecastQty:w.originalForecastQty, latestForecastQty:w.latestForecastQty,
      firmDroppedQty:w.firmDroppedQty, receivedWarehouseQty:w.receivedWarehouseQty, issuedFactoryQty:w.issuedFactoryQty,
      balancePendingQty:w.balancePendingQty, varianceStatus:computeVarianceStatus(w),
    }))
    .sort((a,b)=>String(a.ehdWeek).localeCompare(String(b.ehdWeek),undefined,{numeric:true}));
}

// MATCHED: firm drop tracks the latest forecast within 10%.
// SHORTAGE: firm drop is running more than 10% below the latest forecast.
// SURGE: firm drop is running more than 10% above the latest forecast.
// CRITICAL_DRIFT: the forecast itself has moved >15% since the first revision
// AND the firm drop is also off the latest forecast by >15% — i.e. both the
// plan and the execution are unstable for that week.
function computeVarianceStatus(w){
  const forecastDrift = w.originalForecastQty>0 ? Math.abs(w.latestForecastQty-w.originalForecastQty)/w.originalForecastQty : 0;
  const firmDrift = w.latestForecastQty>0 ? (w.firmDroppedQty-w.latestForecastQty)/w.latestForecastQty : (w.firmDroppedQty>0?1:0);
  if(forecastDrift>0.15 && Math.abs(firmDrift)>0.15) return 'CRITICAL_DRIFT';
  if(firmDrift < -0.10) return 'SHORTAGE';
  if(firmDrift > 0.10) return 'SURGE';
  return 'MATCHED';
}

// ---------- UI atoms ----------
function KpiCard({label,value,tone,foot}){
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className={"kpi-value"+(tone?" "+tone:"")}>{value}</div>
      {foot && <div className="kpi-foot">{foot}</div>}
    </div>
  );
}
function Pill({status}){
  const labelMap = {FIRMED:'Firmed',PARTIAL_FIRM:'Partial firm',FORECAST_PENDING:'Forecast pending',OUT_OF_FORECAST:'Out of forecast',UNEXPECTED_ORDER:'Unexpected order'};
  return <span className={"pill "+status}><span className="pill-dot"></span>{labelMap[status]||status}</span>;
}
function fmt(n){ return Number(n||0).toLocaleString('en-US'); }
function exportToExcel(sheets, filename){
  // sheets: [{name, rows: [{col:val,...}]}]
  const wb = XLSX.utils.book_new();
  for(const s of sheets){
    const ws = XLSX.utils.json_to_sheet(s.rows);
    XLSX.utils.book_append_sheet(wb, ws, s.name.slice(0,31)); // Excel sheet-name limit
  }
  XLSX.writeFile(wb, filename);
}
function exportToCSV(rows, filename){
  if(!rows.length){ alert('Nothing to export.'); return; }
  const headers = Object.keys(rows[0]);
  const esc = v=>{ const s = v==null? '' : String(v); return /[",\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; };
  const csv = [headers.join(','), ...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n');
  const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function exportToPDF(title, rows, filename){
  if(!rows.length){ alert('Nothing to export.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape'});
  doc.setFontSize(13); doc.text(title, 14, 14);
  const headers = Object.keys(rows[0]);
  doc.autoTable({
    head:[headers], body: rows.map(r=>headers.map(h=>r[h]==null?'':String(r[h]))),
    startY:20, styles:{fontSize:7}, headStyles:{fillColor:[4,102,175]},
  });
  doc.save(filename);
}
// One control that reports respect the currently selected filters — pass the already-filtered rows in.
function ExportButtons({title,rows,baseFilename}){
  if(!rows || !rows.length) return null;
  const stamp = new Date().toISOString().slice(0,10);
  return (
    <div style={{display:'flex',gap:6}}>
      <button className="btn" onClick={()=>exportToExcel([{name:title.slice(0,31),rows}], `${baseFilename}_${stamp}.xlsx`)}>Excel</button>
      <button className="btn" onClick={()=>exportToCSV(rows, `${baseFilename}_${stamp}.csv`)}>CSV</button>
      <button className="btn" onClick={()=>exportToPDF(title, rows, `${baseFilename}_${stamp}.pdf`)}>PDF</button>
    </div>
  );
}

// ---------- Shipment Management: UI ----------
function achieveStatus(pct){
  if(pct>=100) return {cls:'ach-good', icon:'✅', label:'Achieved', ring:'var(--green)'};
  if(pct>=90)  return {cls:'ach-warn', icon:'⚠️', label:'Near plan', ring:'var(--amber)'};
  return {cls:'ach-bad', icon:'❌', label:'Below plan', ring:'var(--red)'};
}
function AchievementKpiCard({label,value,sub,pct,showAchievement,icon}){
  const st = showAchievement ? achieveStatus(pct) : {cls:'ach-good',icon:icon||'●',ring:'var(--primary)'};
  const r=19, c=2*Math.PI*r, dash=c*Math.max(0,Math.min(pct,100))/100;
  return (
    <div className="sm-kpi-card">
      {showAchievement && <span className={"sm-achieve-pill "+st.cls} style={{position:'absolute',top:13,right:13}}>{st.icon} {st.label}</span>}
      <div className="sm-kpi-top">
        <div>
          <div className="kpi-label">{label}</div>
          <div className="kpi-value">{value}</div>
          {sub && <div className="kpi-foot">{sub}</div>}
        </div>
        {showAchievement && (
          <div className="sm-ring-wrap">
            <svg width="46" height="46" viewBox="0 0 46 46">
              <circle className="sm-ring-bg" cx="23" cy="23" r={r}></circle>
              <circle className="sm-ring-fg" cx="23" cy="23" r={r} stroke={st.ring} strokeDasharray={`${dash} ${c}`}></circle>
            </svg>
            <div className="sm-ring-icon">{st.icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}
// Natural sort key for manually-tagged week labels (WK01, WK02 … WK10) so numeric order
// is respected instead of alphabetical (which would put WK10 before WK2).
function weekLabelSortKey(label){
  const m = String(label||'').match(/(\d+)/);
  if(m) return '0_'+m[1].padStart(6,'0')+'_'+String(label||'').toLowerCase();
  return '1_'+String(label||'').toLowerCase();
}
function suggestNextWeekLabel(invoices){
  let maxN = 0;
  (invoices||[]).forEach(inv=>{
    const m = String(inv.weekLabel||'').match(/(\d+)/);
    if(m) maxN = Math.max(maxN, parseInt(m[1],10));
  });
  return 'WK' + String(maxN+1).padStart(2,'0');
}
function InvoiceUploadDrop({onFiles,parsing,invoices}){
  const inputRef = React.useRef();
  const [drag,setDrag] = useState(false);
  const [weekLabel,setWeekLabel] = useState(()=>suggestNextWeekLabel(invoices));
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,flexWrap:'wrap'}}>
        <label style={{fontSize:11.5,color:'var(--ink-soft)',fontWeight:600}}>Tag this batch as</label>
        <input type="text" value={weekLabel} onChange={e=>setWeekLabel(e.target.value)}
          placeholder="e.g. WK01" style={{width:110,fontFamily:'var(--font-mono)',fontWeight:700}} />
        <span style={{fontSize:11,color:'var(--ink-faint)'}}>Every PDF you drop below in this batch gets tagged with this week — upload WK01's invoices, then come back and change this to WK02 for next week's batch.</span>
      </div>
      <div className={"sm-drop"+(drag?" sm-drag":"")} onClick={()=>inputRef.current.click()}
        onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
        onDrop={e=>{ e.preventDefault(); setDrag(false); if(e.dataTransfer.files.length) onFiles(e.dataTransfer.files, weekLabel.trim()||'Unspecified'); }}>
        <input ref={inputRef} type="file" accept=".pdf" multiple onChange={e=>{
          if(e.target.files.length) onFiles(e.target.files, weekLabel.trim()||'Unspecified'); e.target.value='';
        }} />
        <div className="drop-title">{parsing? 'Reading invoices…' : 'Drop Commercial Invoice PDFs here, or click to browse'}</div>
        <div>Upload the shipping team's files exactly as received — multiple at once is fine. Duplicate invoice numbers are skipped automatically.</div>
      </div>
    </div>
  );
}
function InvoiceStatusBadge({inv}){
  if(inv.reviewFlag) return <span className="sm-achieve-pill ach-warn" title={inv.reviewFlag}>⚠️ Review</span>;
  return <span className="sm-achieve-pill ach-good">✅ OK</span>;
}

function ShipmentManagementDashboard({invoices,targets,setTargets}){
  const kpis = useMemo(()=>computeInvoiceKpis(invoices),[invoices]);
  const qtyPct = targets.qty>0 ? (kpis.totalQty/targets.qty*100) : 0;
  const valPct = targets.value>0 ? (kpis.totalFobValue/targets.value*100) : 0;
  const byCountry = useMemo(()=>groupInvoicesBy(invoices, inv=>inv.portOfDischarge),[invoices]);
  const maxCountryVal = Math.max(1,...byCountry.map(g=>g.fobValue));

  if(!invoices.length){
    return (
      <div className="section"><div className="section-body">
        <div className="empty"><b>No invoices logged yet.</b><br/>Upload this week's Commercial Invoice PDFs from the Upload &amp; Log tab to populate the dashboard.</div>
      </div></div>
    );
  }

  return (
    <React.Fragment>
      <div className="filter-row" style={{marginBottom:16}}>
        <div className="target-field" style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:12,color:'var(--ink-soft)',fontWeight:600}}>Qty Plan (PCS)</span>
          <input type="text" style={{width:110,fontFamily:'var(--font-mono)'}} value={targets.qty}
            onChange={e=>setTargets(t=>({...t,qty:Number(e.target.value.replace(/[^0-9]/g,''))||0}))} />
        </div>
        <div className="target-field" style={{display:'flex',gap:8,alignItems:'center'}}>
          <span style={{fontSize:12,color:'var(--ink-soft)',fontWeight:600}}>FOB Value Plan (USD)</span>
          <input type="text" style={{width:130,fontFamily:'var(--font-mono)'}} value={targets.value}
            onChange={e=>setTargets(t=>({...t,value:Number(e.target.value.replace(/[^0-9]/g,''))||0}))} />
        </div>
        <span style={{fontSize:11,color:'var(--ink-faint)',marginLeft:'auto'}}>Set from your merchandising plan — achievement recalculates live.</span>
      </div>

      <div className="kpi-grid">
        <AchievementKpiCard label="Total Shipments" value={fmt(kpis.totalShipments)} sub={kpis.totalInvoices+' invoice(s) received'} icon="🚢" />
        <AchievementKpiCard label="Total Invoices" value={fmt(kpis.totalInvoices)} sub="commercial invoices logged" icon="📄" />
        <AchievementKpiCard label="Total Quantity" value={fmt(kpis.totalQty)+' pcs'} sub={'vs plan '+fmt(targets.qty)+' pcs'} pct={qtyPct} showAchievement />
        <AchievementKpiCard label="Total FOB Value" value={'$'+fmt(kpis.totalFobValue)} sub={'vs plan $'+fmt(targets.value)} pct={valPct} showAchievement />
        <AchievementKpiCard label="Total Cartons" value={fmt(kpis.totalCartons)+' CTN'} icon="📦" />
        <AchievementKpiCard label="Gross Weight" value={fmt(kpis.totalGrossWeight)+' KGS'} icon="⚖️" />
        <AchievementKpiCard label="Net Weight" value={fmt(kpis.totalNetWeight)+' KGS'} icon="⚖️" />
        <AchievementKpiCard label="Avg $ / PC" value={'$'+(kpis.totalQty? (kpis.totalFobValue/kpis.totalQty):0).toFixed(2)} icon="💲" />
      </div>

      <div className="section" style={{marginTop:20}}>
        <div className="section-head"><div className="section-title">FOB Value by Destination Country</div></div>
        <div className="section-body">
          {byCountry.map(g=>(
            <SimpleBarRow key={g.key} label={g.key} value={g.fobValue} max={maxCountryVal} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

const SM_LOG_SORT_FIELDS = [
  {key:'weekLabel', label:'Week'}, {key:'invoiceNo', label:'Invoice No'}, {key:'date', label:'Date'}, {key:'consignee', label:'Consignee'},
  {key:'portOfDischarge', label:'Destination'}, {key:'cartons', label:'Cartons'}, {key:'qty', label:'Qty'},
  {key:'fobValue', label:'FOB Value'}, {key:'grossWeight', label:'G.W'}, {key:'netWeight', label:'N.W'},
];
function ShipmentManagementLog({invoices,onDelete}){
  const [search,setSearch] = useState('');
  const [statusFilter,setStatusFilter] = useState('');
  const [weekFilter,setWeekFilter] = useState('');
  const [sortField,setSortField] = useState('date');
  const [sortDir,setSortDir] = useState('desc'); // 'asc' = A→Z, 'desc' = Z→A

  const weekOptions = useMemo(()=>{
    const set = new Set(invoices.map(inv=>inv.weekLabel||'Unspecified'));
    return Array.from(set).sort((a,b)=> weekLabelSortKey(a)<weekLabelSortKey(b) ? -1 : weekLabelSortKey(a)>weekLabelSortKey(b) ? 1 : 0);
  },[invoices]);

  const filteredSorted = useMemo(()=>{
    let list = invoices.filter(inv=>{
      if(statusFilter==='review' && !inv.reviewFlag) return false;
      if(statusFilter==='ok' && inv.reviewFlag) return false;
      if(weekFilter && (inv.weekLabel||'Unspecified')!==weekFilter) return false;
      if(!search) return true;
      const hay = [inv.invoiceNo,inv.consignee,inv.portOfDischarge,inv.season,inv.supplierNo].join(' ').toLowerCase();
      return hay.includes(search.toLowerCase());
    });
    list = list.slice().sort((a,b)=>{
      let av = a[sortField], bv = b[sortField];
      if(sortField==='weekLabel'){ av = weekLabelSortKey(av); bv = weekLabelSortKey(bv); }
      else if(typeof av==='number' || typeof bv==='number'){ av = Number(av)||0; bv = Number(bv)||0; }
      else { av = String(av||'').toLowerCase(); bv = String(bv||'').toLowerCase(); }
      if(av<bv) return sortDir==='asc'? -1 : 1;
      if(av>bv) return sortDir==='asc'? 1 : -1;
      return 0;
    });
    return list;
  },[invoices,search,statusFilter,weekFilter,sortField,sortDir]);

  const rows = filteredSorted.map(inv=>({
    'Week':inv.weekLabel||'Unspecified', 'Invoice No':inv.invoiceNo, 'Date':inv.date, 'Consignee':inv.consignee, 'Destination':inv.portOfDischarge,
    'Cartons':inv.cartons, 'Qty (PCS)':inv.qty, 'FOB Value (USD)':inv.fobValue.toFixed(2),
    'G.W (KGS)':inv.grossWeight, 'N.W (KGS)':inv.netWeight, 'Season':inv.season, 'Supplier No':inv.supplierNo,
  }));
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Invoice Log <span className="badge-count">{filteredSorted.length}{filteredSorted.length!==invoices.length? ' of '+invoices.length : ''}</span></div>
        <ExportButtons title="Invoice Log" rows={rows} baseFilename="EMBEE_Invoice_Log" />
      </div>
      <div className="section-body" style={{paddingTop:0}}>
        {!!invoices.length && (
          <div className="filter-row">
            <input type="text" placeholder="Filter invoice no / consignee / destination / season…" value={search} onChange={e=>setSearch(e.target.value)} style={{minWidth:260}} />
            <select value={weekFilter} onChange={e=>setWeekFilter(e.target.value)}>
              <option value="">All weeks</option>
              {weekOptions.map(w=><option key={w} value={w}>{w}</option>)}
            </select>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              <option value="ok">✅ OK</option>
              <option value="review">⚠️ Review</option>
            </select>
            <select value={sortField} onChange={e=>setSortField(e.target.value)} title="Sort by">
              {SM_LOG_SORT_FIELDS.map(f=><option key={f.key} value={f.key}>Sort by {f.label}</option>)}
            </select>
            <button type="button" className={"btn"+(sortDir==='asc'?" primary":"")} onClick={()=>setSortDir('asc')}>
              <Icon name="chevronDown" size={13} style={{transform:'rotate(180deg)'}} /> Sort A→Z
            </button>
            <button type="button" className={"btn"+(sortDir==='desc'?" primary":"")} onClick={()=>setSortDir('desc')}>
              <Icon name="chevronDown" size={13} /> Sort Z→A
            </button>
          </div>
        )}
        {!invoices.length ? <div className="empty">No invoices uploaded yet.</div> : !filteredSorted.length ? <div className="empty">No invoices match this filter.</div> : (
          <div className="table-scroll">
            <table>
              <thead><tr>
                <th>Week</th><th>Invoice No</th><th>Date</th><th>Consignee</th><th>Destination</th>
                <th className="num">Cartons</th><th className="num">Qty</th><th className="num">FOB (USD)</th>
                <th className="num">G.W</th><th className="num">N.W</th><th>Status</th><th></th>
              </tr></thead>
              <tbody>
                {filteredSorted.map(inv=>(
                  <tr key={inv.id}>
                    <td><span className="badge-count">{inv.weekLabel||'Unspecified'}</span></td>
                    <td className="mono">{inv.invoiceNo||'—'}</td>
                    <td>{inv.date||'—'}</td>
                    <td>{inv.consignee||'—'}</td>
                    <td>{inv.portOfDischarge||'—'}</td>
                    <td className="num">{fmt(inv.cartons)}</td>
                    <td className="num">{fmt(inv.qty)}</td>
                    <td className="num">${inv.fobValue.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                    <td className="num">{fmt(inv.grossWeight)}</td>
                    <td className="num">{fmt(inv.netWeight)}</td>
                    <td><InvoiceStatusBadge inv={inv} /></td>
                    <td><button className="icon-btn" title="Remove"
                      onClick={()=>{ if(window.confirm(`Remove invoice ${inv.invoiceNo}? This can't be undone.`)) onDelete(inv.id); }}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {invoices.some(i=>i.reviewFlag) && (
          <div className="sm-flag">⚠️ Some invoices need a quick check — see the Status column. Auto-extracted figures should always be verified before they go to Accounts.</div>
        )}
      </div>
    </div>
  );
}

const SM_REPORTS = [
  {key:'uploadweek', label:'Upload Week'}, {key:'weekly', label:'Weekly (by date)'}, {key:'monthly', label:'Monthly'}, {key:'factory', label:'Factory-wise'},
  {key:'style', label:'Style-wise'}, {key:'po', label:'PO-wise'}, {key:'season', label:'Season-wise'}, {key:'country', label:'Country-wise'},
];
const SM_REPORT_SORT_FIELDS = [
  {key:'key', label:'Name'}, {key:'qty', label:'Qty'}, {key:'fobValue', label:'Value'},
];
function ShipmentManagementReports({invoices}){
  const [report,setReport] = useState('uploadweek');
  const [search,setSearch] = useState('');
  const [sortField,setSortField] = useState('fobValue');
  const [sortDir,setSortDir] = useState('desc'); // 'asc' = A→Z, 'desc' = Z→A

  const grouped = useMemo(()=>{
    switch(report){
      case 'uploadweek': return groupInvoicesBy(invoices, inv=>inv.weekLabel||'Unspecified');
      case 'weekly': return groupInvoicesBy(invoices, inv=>isoWeekOf(inv.date));
      case 'monthly': return groupInvoicesBy(invoices, inv=>monthOf(inv.date));
      case 'factory': return groupInvoicesBy(invoices, inv=>inv.supplierNo? ('Supplier '+inv.supplierNo) : 'EMBEE — Ismailia');
      case 'country': return groupInvoicesBy(invoices, inv=>inv.portOfDischarge);
      case 'style': return groupLineItemsBy(invoices, li=>li.styleNo);
      case 'po': return groupLineItemsBy(invoices, li=>li.po);
      case 'season': return groupLineItemsBy(invoices, li=>li.season);
      default: return [];
    }
  },[invoices,report]);

  const filteredSorted = useMemo(()=>{
    let list = !search ? grouped : grouped.filter(g=>String(g.key||'').toLowerCase().includes(search.toLowerCase()));
    const chronological = (report==='weekly' || report==='monthly');
    list = list.slice().sort((a,b)=>{
      let av = a[sortField], bv = b[sortField];
      if(sortField==='key'){
        if(report==='uploadweek'){
          av = weekLabelSortKey(av); bv = weekLabelSortKey(bv);
        } else if(chronological && a.sortDate!==undefined && b.sortDate!==undefined){
          av = a.sortDate || ''; bv = b.sortDate || '';
        } else {
          av = String(av||'').toLowerCase(); bv = String(bv||'').toLowerCase();
        }
      }
      else { av = Number(av)||0; bv = Number(bv)||0; }
      if(av<bv) return sortDir==='asc'? -1 : 1;
      if(av>bv) return sortDir==='asc'? 1 : -1;
      return 0;
    });
    return list;
  },[grouped,search,sortField,sortDir,report]);

  const rows = filteredSorted.map(g=>({
    [SM_REPORTS.find(r=>r.key===report).label]: g.key, 'Qty (PCS)': g.qty, 'Value (USD)': g.fobValue.toFixed(2),
    ...(g.invoices ? {'Invoices': g.invoices.length, 'Cartons': g.cartons} : {}),
  }));
  const maxVal = Math.max(1,...filteredSorted.map(g=>g.fobValue));
  const totalVal = filteredSorted.reduce((s,g)=>s+g.fobValue,0);

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Consolidated Reports</div>
        <ExportButtons title={SM_REPORTS.find(r=>r.key===report).label+' Report'} rows={rows} baseFilename={'EMBEE_Shipment_'+report} />
      </div>
      <div className="section-body">
        <div className="sm-report-tabs">
          {SM_REPORTS.map(r=>(
            <div key={r.key} className={"sm-report-tab"+(report===r.key?" active":"")} onClick={()=>setReport(r.key)}>{r.label}</div>
          ))}
        </div>
        {!!grouped.length && (
          <div className="filter-row">
            <input type="text" placeholder={`Filter ${SM_REPORTS.find(r=>r.key===report).label.toLowerCase()}…`} value={search} onChange={e=>setSearch(e.target.value)} style={{minWidth:220}} />
            <select value={sortField} onChange={e=>setSortField(e.target.value)} title="Sort by">
              {SM_REPORT_SORT_FIELDS.map(f=><option key={f.key} value={f.key}>Sort by {f.label}</option>)}
            </select>
            <button type="button" className={"btn"+(sortDir==='asc'?" primary":"")} onClick={()=>setSortDir('asc')}>
              <Icon name="chevronDown" size={13} style={{transform:'rotate(180deg)'}} /> Sort A→Z
            </button>
            <button type="button" className={"btn"+(sortDir==='desc'?" primary":"")} onClick={()=>setSortDir('desc')}>
              <Icon name="chevronDown" size={13} /> Sort Z→A
            </button>
          </div>
        )}
        {!grouped.length ? <div className="empty">No invoices uploaded yet.</div> : !filteredSorted.length ? <div className="empty">No rows match this filter.</div> : (
          <div className="table-scroll">
            <table>
              <thead><tr>
                <th>{SM_REPORTS.find(r=>r.key===report).label}</th><th className="num">Qty (PCS)</th>
                <th className="num">Value (USD)</th><th className="num">Share</th><th style={{width:160}}></th>
              </tr></thead>
              <tbody>
                {filteredSorted.map(g=>(
                  <tr key={g.key}>
                    <td className="mono">{g.key}</td>
                    <td className="num">{fmt(g.qty)}</td>
                    <td className="num">${g.fobValue.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                    <td className="num">{totalVal? ((g.fobValue/totalVal)*100).toFixed(1) : '0.0'}%</td>
                    <td><div className="sm-bar-track"><div className="sm-bar-fill" style={{width:(g.fobValue/maxVal*100)+'%'}}></div></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ShipmentManagementPage({invoices,onFiles,parsing,onDelete,skippedNote}){
  const [tab,setTab] = useState('dashboard');
  const [targets,setTargets] = useState({qty:20000,value:140000});
  return (
    <div>
      <div className="sm-subnav">
        <div className={"sm-subnav-item"+(tab==='dashboard'?" active":"")} onClick={()=>setTab('dashboard')}>Dashboard</div>
        <div className={"sm-subnav-item"+(tab==='upload'?" active":"")} onClick={()=>setTab('upload')}>Upload &amp; Log</div>
        <div className={"sm-subnav-item"+(tab==='reports'?" active":"")} onClick={()=>setTab('reports')}>Reports</div>
      </div>
      {tab==='dashboard' && <ShipmentManagementDashboard invoices={invoices} targets={targets} setTargets={setTargets} />}
      {tab==='upload' && (
        <React.Fragment>
          <div className="section" style={{marginBottom:20}}>
            <div className="section-body">
              <InvoiceUploadDrop onFiles={onFiles} parsing={parsing} invoices={invoices} />
              {skippedNote && <div className="sm-flag">{skippedNote}</div>}
            </div>
          </div>
          <ShipmentManagementLog invoices={invoices} onDelete={onDelete} />
        </React.Fragment>
      )}
      {tab==='reports' && <ShipmentManagementReports invoices={invoices} />}
    </div>
  );
}

function RevisionRibbon({batches,label,onDelete}){
  if(!batches.length) return null;
  return (
    <div className="ribbon">
      <span className="ribbon-label">{label} history</span>
      {batches.map((b,i)=>(
        <div key={b.id} className={"ribbon-chip"+(i===batches.length-1?" latest":"")}>
          {onDelete && (
            <button type="button" className="chip-del" title="Remove this revision"
              onClick={()=>{ if(window.confirm(`Remove "${b.fileName}" (${b.rowCount} lines)? This can't be undone.`)) onDelete(b.id); }}>
              ×
            </button>
          )}
          {b.weekLabel && <div className="badge-count" style={{marginBottom:4,display:'inline-block'}}>{b.weekLabel}</div>}
          <div>{b.fileName.length>16? b.fileName.slice(0,15)+'…': b.fileName}</div>
          <div className="chip-meta">{new Date(b.uploadedAt).toLocaleDateString()} · {b.rowCount} lines</div>
        </div>
      ))}
    </div>
  );
}

function UploadDrop({label,hint,onFile,parsing}){
  const inputRef = React.useRef();
  return (
    <div className="drop" onClick={()=>inputRef.current.click()}>
      <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={e=>{
        const f = e.target.files[0]; if(f) onFile(f); e.target.value='';
      }} />
      <div className="drop-title">{parsing? 'Parsing…' : label}</div>
      <div>{hint}</div>
    </div>
  );
}
// Same as UploadDrop but prompts the user to tag this upload as WK01, WK02… so results
// can be filtered/viewed by which week's batch they came from.
function TaggedUploadDrop({label,hint,onFile,parsing,batches}){
  const inputRef = React.useRef();
  const [weekLabel,setWeekLabel] = useState(()=>suggestNextWeekLabel(batches));
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,flexWrap:'wrap'}}>
        <label style={{fontSize:11.5,color:'var(--ink-soft)',fontWeight:600}}>Tag this upload as</label>
        <input type="text" value={weekLabel} onChange={e=>setWeekLabel(e.target.value)}
          placeholder="e.g. WK01" style={{width:100,fontFamily:'var(--font-mono)',fontWeight:700}} />
      </div>
      <div className="drop" onClick={()=>inputRef.current.click()}>
        <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={e=>{
          const f = e.target.files[0]; if(f) onFile(f, weekLabel.trim()||'Unspecified'); e.target.value='';
        }} />
        <div className="drop-title">{parsing? 'Parsing…' : label}</div>
        <div>{hint}</div>
      </div>
    </div>
  );
}

// ---------- Shipment Performance: UI ----------
// The Shipment Details file carries no week column, so upload asks the user to confirm the
// shipment week (defaults to the Tuesday of the current week, per the business rule) before parsing.
function ShipmentDetailsUploadDrop({onFile,parsing}){
  const inputRef = React.useRef();
  const [weekDate,setWeekDate] = useState(isoDateStr(tuesdayOfWeek(new Date())));
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
        <label style={{fontSize:11.5,color:'var(--ink-soft)',fontWeight:600}}>Shipment week (Tuesday)</label>
        <input type="date" value={weekDate} onChange={e=>setWeekDate(e.target.value)} style={{padding:'5px 8px',fontSize:12.5}} />
        <span className="badge-count">{weekLabelOf(new Date(weekDate+'T00:00:00'))}</span>
      </div>
      <div className="drop" onClick={()=>inputRef.current.click()}>
        <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={e=>{
          const f = e.target.files[0]; if(f) onFile(f, new Date(weekDate+'T00:00:00')); e.target.value='';
        }} />
        <div className="drop-title">{parsing? 'Parsing…' : 'Upload Shipment Details (weekly)'}</div>
        <div>Style#, PO#, Size, Total Cartons, Total PCS, Price USD/PC, Total Price in USD…</div>
      </div>
    </div>
  );
}
function ShipPerfStatusPill({status}){
  const map = {
    ON_TIME:{label:'On time',cls:'FIRMED'}, DELAYED:{label:'Delayed',cls:'OUT_OF_FORECAST'},
    PARTIAL:{label:'Partial',cls:'PARTIAL_FIRM'}, DELAYED_PARTIAL:{label:'Partial · late',cls:'UNEXPECTED_ORDER'},
    PENDING:{label:'Pending',cls:'FORECAST_PENDING'}, NOT_SHIPPED_LATE:{label:'Not shipped · late',cls:'OUT_OF_FORECAST'},
  };
  const m = map[status]||{label:status,cls:'FORECAST_PENDING'};
  return <span className={"pill "+m.cls}><span className="pill-dot"></span>{m.label}</span>;
}
function pctTone(pct){ if(pct==null) return null; return pct>=95?'green':pct>=85?'amber':'red'; }
function HotKpiRow({label,stat,statPrev,target}){
  const delta = (stat && statPrev) ? stat.pct-statPrev.pct : null;
  const color = stat==null ? 'var(--ink-faint)' : (stat.pct>=target ? 'var(--green)' : 'var(--red)');
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'7px 0',borderBottom:'1px solid var(--border-soft)'}}>
      <span style={{fontSize:12,fontWeight:700,color:'#B8860B'}}>{label}</span>
      <span style={{display:'flex',alignItems:'baseline',gap:6}}>
        <span style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:15,color}}>{stat==null?'—':stat.pct.toFixed(2)+'%'}</span>
        {delta==null
          ? <span style={{fontSize:10.5,color:'var(--ink-faint)'}}>NA</span>
          : <span style={{fontSize:10.5,fontWeight:700,color: delta>=0?'var(--green)':'var(--red)'}}>{delta>=0?'▲':'▼'}{Math.abs(delta).toFixed(1)}pt</span>}
      </span>
    </div>
  );
}
function HotKpiCard({title,tooltip,bundle,target}){
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title" title={tooltip} style={{cursor:tooltip?'help':'default'}}>{title}{tooltip && <span style={{color:'var(--ink-faint)',fontWeight:400}}> ⓘ</span>}</div>
      </div>
      <div className="section-body" style={{paddingTop:8}}>
        <HotKpiRow label="WK" stat={bundle.wk} statPrev={bundle.wkPrev} target={target} />
        <HotKpiRow label="YTD" stat={bundle.ytd} statPrev={bundle.ytdPrev} target={target} />
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'7px 0 2px'}}>
          <span style={{fontSize:12,fontWeight:700,color:'#B8860B'}}>On time + Adv Target</span>
          <span style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:15,color:'var(--primary)'}}>{target}%</span>
        </div>
      </div>
    </div>
  );
}
function ShipmentHotKpiSection({hotKpis}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
      <HotKpiCard title="HOT On time Realized" target={hotKpis.target} bundle={hotKpis.realized}
        tooltip="Based on order CHD week. On time = (AHD or EHD) − CHD is between −4 and +4 days. WK shown is week N-2 (2-week settle lag); YTD is week 1 through week N-2." />
      <HotKpiCard title="HOT On time + Adv Realized" target={hotKpis.target} bundle={hotKpis.adv}
        tooltip="Based on order CHD week. On time = (AHD or EHD) − CHD is +4 days or less (early/advance shipments always count as on time). WK shown is week N-2; YTD is week 1 through week N-2." />
    </div>
  );
}
function ShipmentPerformanceKpiStrip({kpis}){
  return (
    <div className="kpi-grid">
      <KpiCard label="EHD Reliability (-2 Wks)" value={kpis.ehdReliabilityPct!=null? kpis.ehdReliabilityPct.toFixed(1)+'%':'—'}
        tone={pctTone(kpis.ehdReliabilityPct)} foot={`${kpis.ehdRecsCount} PO(s) with EHD & shipment on file`} />
      <KpiCard label="Total Late POs" value={fmt(kpis.totalLatePOs)} tone={kpis.totalLatePOs>0?'red':'green'} foot="Delayed, partial-late or not shipped" />
      <KpiCard label="Total Late Quantity" value={fmt(kpis.totalLateQty)+' pcs'} tone={kpis.totalLateQty>0?'red':'green'} foot="Pending/short qty on late POs" />
    </div>
  );
}
// 12-week HOT% / EHD% trend — lightweight inline bar-pair chart, no chart library needed.
function ShipmentTrendChart({trend}){
  return (
    <div className="section">
      <div className="section-head"><div className="section-title">12-Week HOT% & EHD% Trend</div></div>
      <div className="section-body">
        <div style={{display:'flex',alignItems:'flex-end',gap:10,height:150,overflowX:'auto',paddingBottom:4}}>
          {trend.map(t=>(
            <div key={t.weekKey} style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:44}}>
              <div style={{display:'flex',alignItems:'flex-end',gap:3,height:110}}>
                <div title={`HOT% ${t.hotPct!=null?t.hotPct.toFixed(1)+'%':'no data'} (${t.hotDue} due)`}
                  style={{width:14,height:(t.hotPct!=null? Math.max(t.hotPct,3):3)+'%',background:'var(--primary)',borderRadius:'3px 3px 0 0',alignSelf:'flex-end'}}></div>
                <div title={`EHD% ${t.ehdPct!=null?t.ehdPct.toFixed(1)+'%':'no data'} (${t.ehdDue} due)`}
                  style={{width:14,height:(t.ehdPct!=null? Math.max(t.ehdPct,3):3)+'%',background:'var(--teal)',borderRadius:'3px 3px 0 0',alignSelf:'flex-end'}}></div>
              </div>
              <div style={{fontSize:9.5,color:'var(--ink-faint)',marginTop:5,fontFamily:'var(--font-mono)'}}>{t.weekLabel}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:16,marginTop:10,fontSize:11.5,color:'var(--ink-soft)'}}>
          <span><span style={{display:'inline-block',width:9,height:9,background:'var(--primary)',borderRadius:2,marginRight:5}}></span>HOT% (CHD)</span>
          <span><span style={{display:'inline-block',width:9,height:9,background:'var(--teal)',borderRadius:2,marginRight:5}}></span>EHD% (-2 wks)</span>
        </div>
      </div>
    </div>
  );
}
function ShipmentFactoryTable({factoryRows}){
  if(!factoryRows.length) return null;
  return (
    <div className="section">
      <div className="section-head"><div className="section-title">Factory-wise HOT% & EHD%</div></div>
      <div className="section-body table-scroll">
        <table>
          <thead><tr><th>Supplier / Subcontractor</th><th className="num">POs</th><th className="num">Due (CHD)</th><th className="num">HOT%</th><th className="num">EHD Due</th><th className="num">EHD%</th></tr></thead>
          <tbody>
            {factoryRows.map(f=>(
              <tr key={f.factory}>
                <td>{f.factory}</td>
                <td className="num">{fmt(f.poCount)}</td>
                <td className="num">{fmt(f.due)}</td>
                <td className="num" style={{color:f.hotPct==null?'var(--ink-faint)':f.hotPct>=95?'var(--green)':f.hotPct>=85?'var(--amber)':'var(--red)',fontWeight:600}}>{f.hotPct==null?'—':f.hotPct.toFixed(1)+'%'}</td>
                <td className="num">{fmt(f.ehdDue)}</td>
                <td className="num" style={{color:f.ehdPct==null?'var(--ink-faint)':f.ehdPct>=95?'var(--green)':f.ehdPct>=85?'var(--amber)':'var(--red)',fontWeight:600}}>{f.ehdPct==null?'—':f.ehdPct.toFixed(1)+'%'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function ShipmentTopDelayedTable({top10}){
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Top 10 Delayed POs</div>
        <ExportButtons title="Top 10 Delayed POs" baseFilename="top10_delayed_pos" rows={top10.map(r=>({
          'PO#':r.po,'Style / Iman Code':r.styleNo,'Factory':r.factory,'Season':r.season,
          'Ordered Qty':r.orderedQty,'Shipped Qty':r.actualShippedQty,'Pending Qty':r.remainingQty,
          'CHD Week':r.chdWeek,'CHD Date':r.chdDate||'','Last Shipment Week':r.lastShipmentWeekLabel,
          'Delay (Days)':r.delayDays==null?'':r.delayDays,'Status':r.status,'Delay Reason':r.delayReason,'Delay Responsible':r.delayResponsible,
        }))} />
      </div>
      <div className="section-body table-scroll">
        {!top10.length ? <div className="empty">No delayed POs — everything matched is on time. <b>🎉</b></div> : (
          <table>
            <thead><tr><th>PO#</th><th>Style / Iman Code</th><th>Factory</th><th className="num">Ordered</th><th className="num">Shipped</th><th className="num">Pending</th><th>CHD Week</th><th>Last Ship Wk</th><th className="num">Delay (Days)</th><th>Status</th></tr></thead>
            <tbody>
              {top10.map(r=>(
                <tr key={r.po}>
                  <td className="mono">{r.po}</td><td>{r.styleNo}</td><td>{r.factory}</td>
                  <td className="num">{fmt(r.orderedQty)}</td><td className="num">{fmt(r.actualShippedQty)}</td><td className="num">{fmt(r.remainingQty)}</td>
                  <td className="mono">{r.chdWeek}</td><td className="mono">{r.lastShipmentWeekLabel||'—'}</td>
                  <td className="num" style={{color:'var(--red)',fontWeight:700}}>{r.delayDays==null?'—':fmt(r.delayDays)}</td>
                  <td><ShipPerfStatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
function ShipmentPerformanceRecordsTable({records}){
  const [statusFilter,setStatusFilter] = useState('');
  const [factoryFilter,setFactoryFilter] = useState('');
  const [weekFilter,setWeekFilter] = useState('');
  const [search,setSearch] = useState('');
  const factories = useMemo(()=>[...new Set(records.map(r=>r.factory).filter(Boolean))].sort(),[records]);
  const weekOptions = useMemo(()=>{
    const set = new Set(records.map(r=>r.lastShipmentWeekLabel).filter(Boolean));
    return Array.from(set).sort((a,b)=> weekLabelSortKey(a)<weekLabelSortKey(b)?-1:weekLabelSortKey(a)>weekLabelSortKey(b)?1:0);
  },[records]);
  const filtered = useMemo(()=>records.filter(r=>
    (!statusFilter || r.status===statusFilter) &&
    (!factoryFilter || r.factory===factoryFilter) &&
    (!weekFilter || r.lastShipmentWeekLabel===weekFilter) &&
    (!search || (r.po+' '+r.styleNo).toLowerCase().includes(search.toLowerCase()))
  ),[records,statusFilter,factoryFilter,weekFilter,search]);
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Matched PO Detail — Plan vs Actual <span className="badge-count">{filtered.length}</span></div>
        <ExportButtons title="Shipment Performance Detail" baseFilename="shipment_performance_detail" rows={filtered.map(r=>({
          'PO#':r.po,'Style / Iman Code':r.styleNo,'Factory':r.factory,'Season':r.season,
          'Ordered Qty':r.orderedQty,'Shipped Qty':r.actualShippedQty,'Remaining Qty':r.remainingQty,
          'Completion %':r.shipmentCompletionPct.toFixed(1),
          'CHD Week':r.chdWeek,'CHD Date':r.chdDate||'','EHD Week':r.ehdWeek,'EHD Date':r.ehdDate||'',
          'Actual Shipment Week':r.lastShipmentWeekLabel,'Delay (Days)':r.delayDays==null?'':r.delayDays,
          'Status':r.status,'Delay Reason':r.delayReason,'Delay Responsible':r.delayResponsible,
        }))} />
      </div>
      <div className="section-body">
        <div className="filter-row">
          <input type="text" placeholder="Search PO# / Style…" value={search} onChange={e=>setSearch(e.target.value)} />
          <select value={weekFilter} onChange={e=>setWeekFilter(e.target.value)}>
            <option value="">All weeks (actual shipment)</option>
            {weekOptions.map(w=><option key={w} value={w}>{w}</option>)}
          </select>
          <select value={factoryFilter} onChange={e=>setFactoryFilter(e.target.value)}>
            <option value="">All factories</option>
            {factories.map(f=><option key={f} value={f}>{f}</option>)}
          </select>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            <option value="ON_TIME">On time</option><option value="DELAYED">Delayed</option>
            <option value="PARTIAL">Partial</option><option value="DELAYED_PARTIAL">Partial · late</option>
            <option value="PENDING">Pending</option><option value="NOT_SHIPPED_LATE">Not shipped · late</option>
          </select>
        </div>
        <div className="table-scroll">
          {!filtered.length ? <div className="empty">No matching records.</div> : (
            <table>
              <thead><tr>
                <th>PO#</th><th>Style / Iman</th><th>Factory</th><th>Season</th>
                <th className="num">Ordered</th><th className="num">Shipped</th><th className="num">Remaining</th><th className="num">Compl. %</th>
                <th>CHD Week</th><th>EHD Week</th><th>Actual Wk</th><th className="num">Delay (d)</th><th>Status</th>
              </tr></thead>
              <tbody>
                {filtered.map(r=>(
                  <tr key={r.po}>
                    <td className="mono">{r.po}</td><td>{r.styleNo}</td><td>{r.factory}</td><td>{r.season}</td>
                    <td className="num">{fmt(r.orderedQty)}</td><td className="num">{fmt(r.actualShippedQty)}</td>
                    <td className="num">{fmt(r.remainingQty)}</td>
                    <td className="num">{r.shipmentCompletionPct.toFixed(0)}%</td>
                    <td className="mono">{r.chdWeek}</td><td className="mono">{r.ehdWeek}</td><td className="mono">{r.lastShipmentWeekLabel||'—'}</td>
                    <td className="num" style={{color:r.delayDays>0?'var(--red)':'inherit',fontWeight:r.delayDays>0?700:400}}>{r.delayDays==null?'—':fmt(r.delayDays)}</td>
                    <td><ShipPerfStatusPill status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
function ShipmentPerformancePage({planBatches,detailsBatches,onPlanUpload,parsingPlan,onDeletePlan,onDetailsUpload,parsingDetails,onDeleteDetails}){
  const records = useMemo(()=>computeShipmentPerformanceRecords(planBatches,detailsBatches),[planBatches,detailsBatches]);
  const kpis = useMemo(()=>computeShipmentPerformanceKpis(records),[records]);
  const hotKpis = useMemo(()=>computeHotKpis(records),[records]);
  const hasData = planBatches.length>0 || detailsBatches.length>0;
  return (
    <div>
      <div className="section">
        <div className="section-head"><div className="section-title">Weekly Data Sources</div></div>
        <div className="section-body">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div>
              <div className="acc-subhead">Data Source 1 — Decathlon Weekly Shipment Plan</div>
              <TaggedUploadDrop label="Upload Shipment Plan (weekly)" hint="Order Number, Model/Iman Code, Ordered/Shipped/Delivered Qty, CHD & EHD dates…" onFile={onPlanUpload} parsing={parsingPlan} batches={planBatches} />
              <RevisionRibbon batches={planBatches} label="Shipment Plan" onDelete={onDeletePlan} />
            </div>
            <div>
              <div className="acc-subhead">Data Source 2 — Shipment Details</div>
              <ShipmentDetailsUploadDrop onFile={onDetailsUpload} parsing={parsingDetails} />
              <RevisionRibbon batches={detailsBatches} label="Shipment Details" onDelete={onDeleteDetails} />
            </div>
          </div>
          <div className="foot-note">Matching: Iman Code ↔ STYLE#, Order Number ↔ PO#, Ordered Qty ↔ TTL NO PCS. Every Shipment Plan upload replaces prior figures per PO (latest revision wins); every Shipment Details upload adds that week's actuals on top of prior weeks for the same PO.</div>
        </div>
      </div>
      {!hasData ? (
        <div className="section"><div className="empty"><b>No data yet.</b><br/>Upload this week's Shipment Plan and Shipment Details files above to generate HOT%, EHD reliability, and delay reports automatically.</div></div>
      ) : (
        <React.Fragment>
          <ShipmentHotKpiSection hotKpis={hotKpis} />
          <ShipmentPerformanceKpiStrip kpis={kpis} />
          <ShipmentTrendChart trend={kpis.trend} />
          <ShipmentFactoryTable factoryRows={kpis.factoryRows} />
          <ShipmentTopDelayedTable top10={kpis.top10Delayed} />
          <ShipmentPerformanceRecordsTable records={records} />
        </React.Fragment>
      )}
    </div>
  );
}

// ---------- Pages ----------
function ForecastDashboardSection({forecastBatches,firmOrderBatches,comparison}){
  if(!forecastBatches.length && !firmOrderBatches.length){
    return <div className="empty">No data imported yet. Go to <b>Forecast</b> and <b>Firm Orders</b> to upload your weekly files — the dashboard fills in automatically once both are in.</div>;
  }
  const totalForecast = comparison.reduce((s,r)=>s+r.forecastQty,0);
  const totalFirm = comparison.reduce((s,r)=>s+r.firmQty,0);
  const accuracy = totalForecast>0 ? Math.max(0,100 - Math.abs(totalForecast-totalFirm)/totalForecast*100) : 0;
  const accuracyTone = accuracy>85 ? 'text-emerald-400' : accuracy>60 ? 'text-amber-400' : 'text-rose-400';
  const latestFirm = firmOrderBatches[firmOrderBatches.length-1];
  const latestForecast = forecastBatches[forecastBatches.length-1];
  const warehouseReceived = latestFirm ? latestFirm.lines.reduce((s,l)=>s+l.deliveredQty,0) : 0;
  const shortageUnits = comparison.reduce((s,r)=>s+Math.max(0,r.forecastQty-r.firmQty),0);
  const latestLabel = latestForecast ? latestForecast.fileName : (latestFirm ? latestFirm.fileName : '—');
  const weeklyMatrix = useMemo(()=>computeWeeklyMatrix(forecastBatches,firmOrderBatches),[forecastBatches,firmOrderBatches]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 text-slate-100">
      {/* Hero banner */}
      <div className="relative h-60 w-full overflow-hidden border-b border-slate-900 bg-slate-900">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">Live Supply Chain Node</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">EMBEE Planning Command</h1>
            <p className="text-xs text-slate-400 max-w-xl mt-1">
              Decathlon rolling demand matrix — forecast vs firm order execution, built from your imported weekly files.
            </p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded backdrop-blur-md flex gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">LATEST IMPORT</span>
              <span className="text-white font-bold">{latestLabel}</span>
            </div>
            <div className="border-l border-slate-800 pl-6">
              <span className="text-slate-500 block text-[10px]">FORECAST ACCURACY</span>
              <span className={accuracyTone+" font-bold"}>{accuracy.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1 uppercase">Total Forecast Pipeline</span>
          <div className="text-2xl font-black text-white tracking-tight">{fmt(totalForecast)} <span className="text-xs text-slate-500 font-normal">Pcs</span></div>
          <p className="text-[10px] text-slate-500 mt-2">Latest forecast revision, all items</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1 uppercase">Total Firm Drops Placed</span>
          <div className="text-2xl font-black text-teal-400 tracking-tight">{fmt(totalFirm)} <span className="text-xs text-slate-500 font-normal">Pcs</span></div>
          <p className="text-[10px] text-teal-500/80 font-semibold mt-2">Validated buying customer POs</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1 uppercase">Warehouse Received</span>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">{fmt(warehouseReceived)} <span className="text-xs text-slate-500 font-normal">Pcs</span></div>
          <p className="text-[10px] text-emerald-500/80 font-semibold mt-2">Delivered qty, latest PO batch</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold tracking-wider block mb-1 uppercase">Shortage Exceptions</span>
          <div className="text-2xl font-black text-rose-400 tracking-tight">{fmt(shortageUnits)} <span className="text-xs text-slate-500 font-normal">Units</span></div>
          <p className="text-[10px] text-rose-500/80 font-semibold mt-2">Forecast still without a firm drop</p>
        </div>
      </section>

      {/* Forecast vs Firm — graph flow */}
      <section className="px-8 pb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 bg-slate-900/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Forecast vs Firm — Graph Flow</h3>
            <p className="text-xs text-slate-400 mt-0.5">Status breakdown and top items by volume, from the latest imports</p>
          </div>
          {!comparison.length ? (
            <div className="p-8 text-xs text-slate-400">Upload at least a Forecast file to see this chart.</div>
          ) : (
            <div className="p-6">
              <DashboardStatusFlow comparison={comparison} />
              <div className="border-t border-slate-800 my-6"></div>
              <DashboardComparisonChart comparison={comparison} groupBy="model" />
            </div>
          )}
        </div>
      </section>

      {/* Critical watchlist */}
      <section className="px-8 pb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 bg-slate-900/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Critical Watchlist</h3>
            <p className="text-xs text-slate-400 mt-0.5">Shortage items, prioritized by nearest EHD (falls back to largest shortage if no EHD data)</p>
          </div>
          {!comparison.length ? (
            <div className="p-8 text-xs text-slate-400">Upload Forecast and Firm Order files to populate the watchlist.</div>
          ) : (
            <div className="px-6"><DashboardWatchlist comparison={comparison} /></div>
          )}
        </div>
      </section>

      {/* Weekly execution matrix */}
      <section className="px-8 pb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Weekly Drop Flow &amp; Inventory Intake Ledger</h3>
              <p className="text-xs text-slate-400 mt-0.5">By EHD week, from the latest firm order import</p>
            </div>
            {weeklyMatrix.length>0 && (
              <button
                className="text-[11px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700 rounded px-3 py-1.5 hover:bg-slate-800"
                onClick={()=>exportToExcel(
                  [{name:'Weekly Matrix', rows: weeklyMatrix.map(w=>({
                    'EHD Week':w.ehdWeek, 'Original Forecast':w.originalForecastQty, 'Latest Forecast':w.latestForecastQty,
                    'Firm PO Drop':w.firmDroppedQty, 'Received (Whse)':w.receivedWarehouseQty,
                    'Issued (Factory)':w.issuedFactoryQty, 'Balance Outstanding':w.balancePendingQty, 'Variance Status':w.varianceStatus,
                  }))}],
                  `weekly-execution_${new Date().toISOString().slice(0,10)}.xlsx`
                )}
              >Export</button>
            )}
          </div>
          {!weeklyMatrix.length ? (
            <div className="p-8 text-xs text-slate-400">Upload a firm order file to see weekly execution tracking.</div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="p-4">EHD Week</th>
                  <th className="p-4 text-right">Original Forecast</th>
                  <th className="p-4 text-right">Latest Revised Forecast</th>
                  <th className="p-4 text-right">Firm PO Drop</th>
                  <th className="p-4 text-right">Received (Whse)</th>
                  <th className="p-4 text-right">Issued (Factory)</th>
                  <th className="p-4 text-right">Balance Outstanding</th>
                  <th className="p-4 text-center">Variance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                {weeklyMatrix.map((row,idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white tracking-wide">{row.ehdWeek}</td>
                    <td className="p-4 text-right font-mono text-slate-500">{fmt(row.originalForecastQty)}</td>
                    <td className="p-4 text-right font-mono text-slate-300">{fmt(row.latestForecastQty)}</td>
                    <td className="p-4 text-right font-mono font-bold text-teal-400">{fmt(row.firmDroppedQty)}</td>
                    <td className="p-4 text-right font-mono text-emerald-400">{fmt(row.receivedWarehouseQty)}</td>
                    <td className="p-4 text-right font-mono text-amber-400">{fmt(row.issuedFactoryQty)}</td>
                    <td className="p-4 text-right font-mono text-slate-200">{fmt(row.balancePendingQty)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                        row.varianceStatus === 'MATCHED' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-900' :
                        row.varianceStatus === 'SHORTAGE' ? 'bg-amber-950/60 text-amber-400 border-amber-900' :
                        row.varianceStatus === 'SURGE' ? 'bg-blue-950/60 text-blue-400 border-blue-900' :
                        'bg-rose-950/60 text-rose-400 border-rose-900'
                      }`}>
                        {row.varianceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SimpleBarRow({label,value,max,color}){
  const pct = max>0 ? Math.min(100,(value/max)*100) : 0;
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
      <div style={{width:110,fontSize:11,color:'var(--ink-soft)',flexShrink:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{label}</div>
      <div style={{flex:1,background:'var(--border-soft)',borderRadius:4,height:13}}>
        <div style={{width:pct+'%',background:color||'var(--primary)',height:'100%',borderRadius:4}}></div>
      </div>
      <div style={{width:70,textAlign:'right',fontFamily:'var(--font-mono)',fontSize:11.5}}>{fmt(value)}</div>
    </div>
  );
}

// Filters shared by every KPI/chart below — this is the ONLY place overall/combined business totals appear.
function DashboardFilterBar({filters,setF,uniq}){
  const dims = [
    ['season','Season'],['buyer','Buyer'],['factory','Factory'],['company','Company'],['country','Country'],
    ['brand','Brand'],['department','Department'],['productionLine','Production Line'],
    ['styleNo','Style'],['supplier','Supplier'],['fabricSupplier','Fabric Supplier'],
    ['accessoriesSupplier','Accessories Supplier'],
  ];
  const anyActive = Object.values(filters).some(Boolean);
  return (
    <div className="filter-row" style={{marginBottom:14}}>
      {dims.map(([key,label])=>(
        <select key={key} value={filters[key]} onChange={e=>setF(key,e.target.value)}>
          <option value="">{label}: All</option>
          {uniq(key).map(v=><option key={v} value={v}>{v}</option>)}
        </select>
      ))}
      <select value={filters.status} onChange={e=>setF('status',e.target.value)}>
        <option value="">Status: All</option>
        <option value="Ready">Ready</option>
        <option value="Attention">Attention</option>
        <option value="Critical">Critical</option>
      </select>
      {anyActive && <button className="btn" onClick={()=>['season','buyer','factory','company','country','brand','department','productionLine','styleNo','supplier','fabricSupplier','accessoriesSupplier','status'].forEach(k=>setF(k,''))}>Clear filters</button>}
    </div>
  );
}

// Overall business overview for accessory styles — lives ONLY here on the Dashboard.
// Filtering down to one Style behaves exactly like the Accessories page: one style, no combined totals.
function AccessoriesOverviewSection({accessoryStyles,firmOrderBatches,shipmentBatches}){
  const [filters,setFilters] = useState({season:'',buyer:'',factory:'',country:'',brand:'',department:'',
    productionLine:'',styleNo:'',supplier:'',fabricSupplier:'',accessoriesSupplier:'',company:'',status:''});
  const setF = (k,v)=> setFilters(prev=>({...prev,[k]:v}));
  const uniq = (key)=> Array.from(new Set(accessoryStyles.map(s=>s[key]).filter(Boolean))).sort();

  const enriched = useMemo(()=> accessoryStyles.map(s=>{
    const calc = computeStyleCalc(s);
    const summary = computeStyleSummary(s, firmOrderBatches, calc, shipmentBatches);
    return {style:s, calc, summary};
  }),[accessoryStyles, firmOrderBatches, shipmentBatches]);

  const filtered = enriched.filter(({style,summary})=>
    (!filters.season || style.season===filters.season) &&
    (!filters.buyer || style.buyer===filters.buyer) &&
    (!filters.factory || style.factory===filters.factory) &&
    (!filters.country || style.country===filters.country) &&
    (!filters.brand || style.brand===filters.brand) &&
    (!filters.department || style.department===filters.department) &&
    (!filters.productionLine || style.productionLine===filters.productionLine) &&
    (!filters.supplier || style.supplier===filters.supplier) &&
    (!filters.fabricSupplier || style.fabricSupplier===filters.fabricSupplier) &&
    (!filters.accessoriesSupplier || style.accessoriesSupplier===filters.accessoriesSupplier) &&
    (!filters.company || style.company===filters.company) &&
    (!filters.status || summary.status===filters.status) &&
    (!filters.styleNo || style.styleNo===filters.styleNo)
  );

  if(!accessoryStyles.length){
    return <div className="empty">No accessory styles yet. Upload a <b>Selection File</b> on the Weekly Data Import page, or add styles manually on the <b>Accessories</b> page, to populate this overview.</div>;
  }

  // Business rule: filtering to one specific Style = behave exactly like the Accessories page (one style, no totals).
  if(filters.styleNo){
    const match = enriched.find(e=>e.style.styleNo===filters.styleNo);
    return (
      <div>
        <DashboardFilterBar filters={filters} setF={setF} uniq={uniq} />
        {match ? <StyleSummaryPanel style={match.style} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches} onUpdate={()=>{}} />
                : <div className="empty">No style matches this filter.</div>}
      </div>
    );
  }

  const totals = filtered.reduce((a,{style,summary})=>{
    a.selection += n(style.selectionQty); a.fabricCommitment += n(style.fabricCommitmentQty);
    a.accCommitment += n(style.accCommitmentQty); a.firmReceived += summary.totalFirmOrdersReceived;
    a.balanceOrders += summary.balanceOrdersToReceive; a.prevStock += summary.prevSeasonFgStock;
    a.needProduction += summary.needNewProduction; a.fabricOrdered += n(style.fabricOrderedQty);
    a.accOrdered += summary.accessoriesOrdered; a.accReceived += summary.accessoriesReceived;
    a.accBalance += summary.warehouseBalance; a.productionCompleted += summary.productionCompleted;
    a.shipmentCompleted += summary.shipmentCompleted;
    a.shipmentQty += summary.shipment.totalShippedQty; a.pendingShipment += summary.shipment.balanceToShip;

    return a;
  },{selection:0,fabricCommitment:0,accCommitment:0,firmReceived:0,balanceOrders:0,prevStock:0,needProduction:0,
     fabricOrdered:0,accOrdered:0,accReceived:0,accBalance:0,productionCompleted:0,shipmentCompleted:0,
     shipmentQty:0,pendingShipment:0});
  const shipmentPct = totals.selection? totals.shipmentQty/totals.selection : 0;

  const statusCounts = filtered.reduce((a,{summary})=>{ a[summary.status]=(a[summary.status]||0)+1; return a; },{});
  const maxOrdRec = Math.max(1,...filtered.map(({summary})=>Math.max(summary.accessoriesOrdered,summary.accessoriesReceived)));

  return (
    <div>
      <DashboardFilterBar filters={filters} setF={setF} uniq={uniq} />
      {filtered.length===0 ? <div className="empty">No styles match these filters.</div> : (
        <>
          <div className="kpi-grid" style={{marginBottom:18}}>
            <KpiCard label="Total Selection Qty" value={fmt(totals.selection)} />
            <KpiCard label="Total Fabric Commitment" value={fmt(totals.fabricCommitment)} />
            <KpiCard label="Total Accessories Commitment" value={fmt(totals.accCommitment)} />
            <KpiCard label="Total Firm Orders Received" value={fmt(totals.firmReceived)} />
            <KpiCard label="Total Balance Orders" value={fmt(totals.balanceOrders)} tone={totals.balanceOrders>0?'amber':'green'} />
            <KpiCard label="Total Previous Season FG Stock" value={fmt(totals.prevStock)} />
            <KpiCard label="Total Need New Production" value={fmt(totals.needProduction)} tone={totals.needProduction>0?'amber':'green'} />
            <KpiCard label="Total Fabric Ordered" value={fmt(totals.fabricOrdered)} />
            <KpiCard label="Total Accessories Ordered" value={fmt(totals.accOrdered)} />
            <KpiCard label="Total Accessories Received" value={fmt(totals.accReceived)} />
            <KpiCard label="Total Accessories Balance" value={fmt(totals.accBalance)} tone={totals.accBalance<0?'red':'green'} />
            <KpiCard label="Total Production Completed" value={fmt(totals.productionCompleted)} />
            <KpiCard label="Total Shipment Completed" value={fmt(totals.shipmentCompleted)} />
            <KpiCard label="Shipment Qty" value={fmt(totals.shipmentQty)} />
            <KpiCard label="Shipment %" value={(shipmentPct*100).toFixed(0)+'%'} tone={shipmentPct>=1?'green':shipmentPct>=0.6?'amber':'red'} />
            <KpiCard label="Pending Shipment" value={fmt(totals.pendingShipment)} tone={totals.pendingShipment>0?'amber':'green'} />
          </div>

          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
            <ExportButtons title="Dashboard — Overall Business Overview" baseFilename="dashboard-overview" rows={filtered.map(({style,summary})=>({
              Season:style.season, Buyer:style.buyer, 'Style No':style.styleNo, Description:style.description,
              Factory:style.factory, Country:style.country, Company:style.company, Supplier:style.supplier,
              'Selection Qty':n(style.selectionQty), 'Firm Orders Received':summary.totalFirmOrdersReceived,
              'Balance Orders':summary.balanceOrdersToReceive, 'FG Stock':summary.prevSeasonFgStock,
              'Need New Production':summary.needNewProduction, 'Accessories Ordered':summary.accessoriesOrdered,
              'Accessories Received':summary.accessoriesReceived, 'Accessories Balance':summary.warehouseBalance,
              'Shipment Qty':summary.shipment.totalShippedQty, 'Balance to Ship':summary.shipment.balanceToShip,
              'Shipment %':(summary.shipment.shipmentPct*100).toFixed(0)+'%', Status:summary.status,
            }))} />
          </div>

          <div className="section">
            <div className="section-head"><div className="section-title">Accessories Ordered vs Received — by style</div></div>
            <div className="section-body">
              {filtered.map(({style,summary})=>(
                <div key={style.id}>
                  <SimpleBarRow label={style.styleNo} value={summary.accessoriesOrdered} max={maxOrdRec} color="var(--primary)" />
                  <SimpleBarRow label=" " value={summary.accessoriesReceived} max={maxOrdRec} color="var(--teal)" />
                </div>
              ))}
              <div className="foot-note">Blue = Accessories Ordered · Teal = Accessories Received</div>
            </div>
          </div>

          <div className="section">
            <div className="section-head"><div className="section-title">Planning status — {filtered.length} style{filtered.length!==1?'s':''}</div></div>
            <div className="section-body" style={{display:'flex',gap:24,flexWrap:'wrap'}}>
              {['Ready','Attention','Critical'].map(s=>(
                <div key={s} style={{display:'flex',alignItems:'center',gap:8}}>
                  <PlanningStatusPill status={s} />
                  <span className="mono" style={{fontSize:16,fontWeight:700}}>{statusCounts[s]||0}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const DASH_ICONS = {
  accessories: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.53 2.47a1.5 1.5 0 0 0-1.06 0L3.5 5.6A1.5 1.5 0 0 0 2.5 7v5.86c0 4.2 2.9 7.94 7.97 9.62.34.11.72.11 1.06 0C16.6 20.8 19.5 17.06 19.5 12.86V7a1.5 1.5 0 0 0-1-1.4l-5.97-3.13Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  forecast: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20V4M3 20h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 16.5l4-4.5 3 2.6L19 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 8h4.5v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shipmentperf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12h-4l-3 8-6-16-3 8H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function DashboardMenuCard({title,sub,icon,accent,onClick}){
  return (
    <div
      className="section"
      onClick={onClick}
      style={{padding:'20px 22px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,marginBottom:14}}
      onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'}
      onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}
    >
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <div style={{
          width:46,height:46,borderRadius:11,flexShrink:0,
          display:'flex',alignItems:'center',justifyContent:'center',
          background: accent==='teal' ? 'var(--green-soft)' : accent==='amber' ? 'var(--amber-soft)' : 'var(--primary-soft)',
          color: accent==='teal' ? 'var(--green)' : accent==='amber' ? 'var(--amber)' : 'var(--primary)',
        }}>
          {icon}
        </div>
        <div>
          <div className="section-title" style={{fontSize:16,marginBottom:4}}>{title}</div>
          <div className="page-sub" style={{margin:0}}>{sub}</div>
        </div>
      </div>
      <span style={{color:'var(--primary)',fontSize:20,flexShrink:0}}>→</span>
    </div>
  );
}

function Dashboard({forecastBatches,firmOrderBatches,shipmentBatches,comparison,accessoryStyles,shipmentPlanBatches,shipmentDetailsBatches}){
  const [open,setOpen] = useState(null); // null | 'accessories' | 'forecast' | 'shipmentperf'
  const shipPerfRecords = useMemo(()=>computeShipmentPerformanceRecords(shipmentPlanBatches||[],shipmentDetailsBatches||[]),[shipmentPlanBatches,shipmentDetailsBatches]);
  const shipPerfKpis = useMemo(()=>computeShipmentPerformanceKpis(shipPerfRecords),[shipPerfRecords]);
  const shipPerfHotKpis = useMemo(()=>computeHotKpis(shipPerfRecords),[shipPerfRecords]);
  const hasShipPerfData = (shipmentPlanBatches&&shipmentPlanBatches.length>0) || (shipmentDetailsBatches&&shipmentDetailsBatches.length>0);

  if(open===null){
    return (
      <div>
        {hasShipPerfData && (
          <div style={{marginBottom:18}}>
            <div className="acc-subhead" style={{margin:'0 0 8px'}}>Shipment Performance — HOT% &amp; EHD Reliability</div>
            <ShipmentHotKpiSection hotKpis={shipPerfHotKpis} />
            <ShipmentPerformanceKpiStrip kpis={shipPerfKpis} />
          </div>
        )}
        <DashboardMenuCard
          title="Accessories &amp; Style — Business Overview"
          sub="Overall business totals — filter down to one Style to see it exactly as it appears on the Accessories page."
          icon={DASH_ICONS.accessories}
          accent="teal"
          onClick={()=>setOpen('accessories')}
        />
        <DashboardMenuCard
          title="Forecast and Firm"
          sub="Weekly forecast vs firm order data, from your imports."
          icon={DASH_ICONS.forecast}
          accent="blue"
          onClick={()=>setOpen('forecast')}
        />
        <DashboardMenuCard
          title="Shipment Performance"
          sub="Decathlon plan vs actual — HOT%, EHD reliability, factory scorecard &amp; delayed POs."
          icon={DASH_ICONS.shipmentperf}
          accent="amber"
          onClick={()=>setOpen('shipmentperf')}
        />
      </div>
    );
  }

  if(open==='shipmentperf'){
    return (
      <div>
        <div className="btn" style={{marginBottom:14,display:'inline-flex',alignItems:'center',gap:6}} onClick={()=>setOpen(null)}>← Back to Dashboard</div>
        <div className="section-title" style={{fontSize:19,marginBottom:4}}>Shipment Performance</div>
        <div className="page-sub" style={{marginBottom:16}}>Decathlon plan vs actual — HOT%, EHD reliability, factory scorecard &amp; delayed POs. Upload this week's files on the Shipment Performance page in the sidebar.</div>
        {!hasShipPerfData ? (
          <div className="section"><div className="empty"><b>No data yet.</b><br/>Go to Shipment Performance in the sidebar to upload this week's Shipment Plan and Shipment Details files.</div></div>
        ) : (
          <React.Fragment>
            <ShipmentHotKpiSection hotKpis={shipPerfHotKpis} />
            <ShipmentPerformanceKpiStrip kpis={shipPerfKpis} />
            <ShipmentTrendChart trend={shipPerfKpis.trend} />
            <ShipmentFactoryTable factoryRows={shipPerfKpis.factoryRows} />
            <ShipmentTopDelayedTable top10={shipPerfKpis.top10Delayed} />
          </React.Fragment>
        )}
      </div>
    );
  }

  if(open==='accessories'){
    return (
      <div>
        <div className="btn" style={{marginBottom:14,display:'inline-flex',alignItems:'center',gap:6}} onClick={()=>setOpen(null)}>← Back to Dashboard</div>
        <div className="section-title" style={{fontSize:19,marginBottom:4}}>Accessories &amp; Style — Business Overview</div>
        <div className="page-sub" style={{marginBottom:16}}>Overall business totals live only here — filter down to one Style to see it exactly as it appears on the Accessories page.</div>
        <AccessoriesOverviewSection accessoryStyles={accessoryStyles||[]} firmOrderBatches={firmOrderBatches||[]} shipmentBatches={shipmentBatches||[]} />
      </div>
    );
  }

  return (
    <div>
      <div className="btn" style={{marginBottom:14,display:'inline-flex',alignItems:'center',gap:6}} onClick={()=>setOpen(null)}>← Back to Dashboard</div>
      <div className="section-title" style={{fontSize:19,marginBottom:4}}>Forecast and Firm</div>
      <div className="page-sub" style={{marginBottom:16}}>Weekly forecast vs firm order data, from your imports.</div>
      <ForecastDashboardSection forecastBatches={forecastBatches} firmOrderBatches={firmOrderBatches} comparison={comparison} />
    </div>
  );
}

// ---------- Weekly Data Import — the single hub for every file Decathlon sends. ----------
// Uploading here drives Forecast, Firm Orders, Accessories, Production, Shipment, Dashboard and
// Reports automatically — nothing needs to be keyed in twice, and nothing here is manually calculated.
function SheetUrlImport({onSubmit,parsing,error}){
  const [url,setUrl] = useState('');
  const [sheetName,setSheetName] = useState('');
  return (
    <div style={{marginTop:12,paddingTop:12,borderTop:'1px dashed var(--border)'}}>
      <div style={{fontSize:12,color:'var(--ink-soft)',marginBottom:6}}>…or paste a Google Sheet link instead of uploading a file</div>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input type="text" placeholder="https://docs.google.com/spreadsheets/d/…" value={url}
          onChange={e=>setUrl(e.target.value)} style={{flex:1}} disabled={parsing} />
        <button className="btn" disabled={parsing || !url.trim()} onClick={()=>onSubmit(url.trim(), sheetName.trim())}>
          {parsing? 'Importing…' : 'Import'}
        </button>
      </div>
      <input type="text" placeholder="Specific tab name (optional — e.g. ZARAGOZA). Leave blank to read every tab."
        value={sheetName} onChange={e=>setSheetName(e.target.value)} disabled={parsing} style={{width:'100%'}} />
      <div style={{fontSize:11,color:'var(--ink-soft)',marginTop:5}}>
        Sheet must be shared as "Anyone with the link can view". Tries to read every tab at once first;
        if Google blocks that, it falls back to reading one tab at a time — name the tab above if your
        workbook has more than one (e.g. one per factory).
      </div>
      {error && <div style={{fontSize:12,color:'var(--red)',marginTop:6}}>{error}</div>}
    </div>
  );
}
function ImportCard({title,hint,onFile,parsing,batches,revisionLabel,onDelete,sheetImport,tagged}){
  return (
    <div className="section" style={{marginBottom:16}}>
      <div className="section-head"><div className="section-title">{title}</div></div>
      <div className="section-body">
        {tagged
          ? <TaggedUploadDrop label={parsing? 'Parsing…' : `Upload ${title}`} hint={hint} onFile={onFile} parsing={parsing} batches={batches} />
          : <UploadDrop label={parsing? 'Parsing…' : `Upload ${title}`} hint={hint} onFile={onFile} parsing={parsing} />}
        {batches && batches.length>0 && <RevisionRibbon batches={batches} label={revisionLabel} onDelete={onDelete} />}
        {sheetImport}
      </div>
    </div>
  );
}
function WeeklyDataImportPage({
  selectionBatches,onSelectionUpload,parsingSelection,onDeleteSelection,
  forecastBatches,onForecastUpload,parsingForecast,onDeleteForecast,
  firmOrderBatches,onFirmOrderUpload,parsingFirm,onDeleteFirmOrder,
  shipmentBatches,onShipmentUpload,parsingShipmentEmbee,parsingShipmentGlobe,onDeleteShipment,
  onShipmentSheetImport,parsingShipmentEmbeeSheet,parsingShipmentGlobeSheet,shipmentSheetError,
}){
  const embeeBatches = shipmentBatches.filter(b=>b.company==='EMBEE');
  const globeBatches = shipmentBatches.filter(b=>b.company==='GLOBE');
  return (
    <div>
      <div className="section" style={{marginBottom:16,background:'var(--primary-soft)',border:'1px solid var(--primary)'}}>
        <div className="section-body" style={{fontSize:13,color:'var(--ink-soft)'}}>
          Planning starts from the <b>Selection File</b>, not from Firm Orders. Upload the season Selection File once,
          then the four weekly files below every week — everything downstream (Forecast, Firm Orders, Accessories,
          Production, Shipment, Dashboard, Reports) updates automatically. No manual calculation required.
        </div>
      </div>

      <ImportCard title="Season Selection File" revisionLabel="Selection import"
        hint="Reads Season, Buyer, Style Number, Style Description, Colour, Factory, Country, Company (EMBEE/GLOBE), Supplier, Selection Qty. Creates or refreshes each style automatically."
        onFile={onSelectionUpload} parsing={parsingSelection} batches={selectionBatches} onDelete={onDeleteSelection} />

      <ImportCard title="1. Weekly Forecast" revisionLabel="Forecast import" tagged
        hint="Reads the 'Forecast Detail' sheet, unpivots every week column into revision history. Nothing is overwritten."
        onFile={onForecastUpload} parsing={parsingForecast} batches={forecastBatches} onDelete={onDeleteForecast} />

      <ImportCard title="2. Weekly Firm Order" revisionLabel="Firm order import" tagged
        hint="Reads 'Orders' (PO header) and 'Size BreakDown' (line detail) sheets together."
        onFile={onFirmOrderUpload} parsing={parsingFirm} batches={firmOrderBatches} onDelete={onDeleteFirmOrder} />

      <ImportCard title="3. Weekly Shipment Booking — EMBEE" revisionLabel="EMBEE shipment import"
        hint="Upload the Pre-Alert booking workbook as-is (one sheet per factory — e.g. ZARAGOZA, ROUVIGNIES). Reads STYLE#, PO#, Garment Color, Model (R3 code), Size and TTL NO PCS automatically, wherever the table starts. A simple Season/PO/Style/Colour/Factory/Shipped Qty sheet also works."
        onFile={f=>onShipmentUpload(f,'EMBEE')} parsing={parsingShipmentEmbee} batches={embeeBatches} onDelete={onDeleteShipment}
        sheetImport={<SheetUrlImport onSubmit={(url,sheetName)=>onShipmentSheetImport(url,'EMBEE',sheetName)} parsing={parsingShipmentEmbeeSheet} error={shipmentSheetError && shipmentSheetError.company==='EMBEE'? shipmentSheetError.message : null} />} />

      <ImportCard title="4. Weekly Shipment Booking — GLOBE" revisionLabel="GLOBE shipment import"
        hint="Upload the Pre-Alert booking workbook as-is (one sheet per factory — e.g. ZARAGOZA, ROUVIGNIES). Reads STYLE#, PO#, Garment Color, Model (R3 code), Size and TTL NO PCS automatically, wherever the table starts. A simple Season/PO/Style/Colour/Factory/Shipped Qty sheet also works."
        onFile={f=>onShipmentUpload(f,'GLOBE')} parsing={parsingShipmentGlobe} batches={globeBatches} onDelete={onDeleteShipment}
        sheetImport={<SheetUrlImport onSubmit={(url,sheetName)=>onShipmentSheetImport(url,'GLOBE',sheetName)} parsing={parsingShipmentGlobeSheet} error={shipmentSheetError && shipmentSheetError.company==='GLOBE'? shipmentSheetError.message : null} />} />

      <ShipmentBusinessSummarySection shipmentBatches={shipmentBatches} />
    </div>
  );
}


function ForecastPage({batches,onUpload,parsing,onDelete}){
  const [viewId,setViewId] = useState('');
  const viewing = batches.find(b=>b.id===viewId) || batches[batches.length-1];
  return (
    <div>
      <div className="section">
        <div className="section-head"><div className="section-title">Import weekly forecast</div></div>
        <div className="section-body">
          <TaggedUploadDrop label="Upload forecast Excel (e.g. WK29-_2026_FORECAST-_EMBEE.xlsx)" hint="Reads the 'Forecast Detail' sheet, unpivots every week column into revision history. Nothing is overwritten." onFile={onUpload} parsing={parsing} batches={batches} />
        </div>
      </div>
      <RevisionRibbon batches={batches} label="Forecast import" onDelete={onDelete} />
      {viewing && (
        <div className="section">
          <div className="section-head">
            <div className="section-title">Viewing — {viewing.weekLabel||viewing.fileName}</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="badge-count">{viewing.itemCount} items · {viewing.rowCount} lines</span>
              {batches.length>1 && (
                <select value={viewing.id} onChange={e=>setViewId(e.target.value)}>
                  {batches.slice().reverse().map(b=><option key={b.id} value={b.id}>{b.weekLabel||b.fileName}{b.id===batches[batches.length-1].id?' (latest)':''}</option>)}
                </select>
              )}
            </div>
          </div>
          <div className="section-body table-scroll">
            <ForecastTable batch={viewing} />
          </div>
        </div>
      )}
    </div>
  );
}

function ForecastTable({batch}){
  const byItem = useMemo(()=>{
    const m = {};
    for(const l of batch.lines){
      if(!m[l.itemCode]) m[l.itemCode]={itemCode:l.itemCode,itemName:l.itemName,model:l.model,modelName:l.modelName,total:0,weeks:0};
      m[l.itemCode].total += l.forecastQty;
      m[l.itemCode].weeks += 1;
    }
    return Object.values(m).sort((a,b)=>b.total-a.total);
  },[batch]);
  return (
    <table>
      <thead><tr><th>Model</th><th>Item / Size</th><th>Item code</th><th className="num">Weeks fcst.</th><th className="num">Total qty</th></tr></thead>
      <tbody>
        {byItem.slice(0,300).map(r=>(
          <tr key={r.itemCode}>
            <td>{r.model}</td><td>{r.itemName}</td><td className="mono">{r.itemCode}</td>
            <td className="num">{r.weeks}</td><td className="num">{fmt(r.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FirmOrderPage({batches,onUpload,parsing,onDelete}){
  const [viewId,setViewId] = useState('');
  const viewing = batches.find(b=>b.id===viewId) || batches[batches.length-1];
  return (
    <div>
      <div className="section">
        <div className="section-head"><div className="section-title">Import weekly firm orders</div></div>
        <div className="section-body">
          <TaggedUploadDrop label="Upload firm order Excel (e.g. Demand_WK29.xlsx)" hint="Reads 'Orders' (PO header) and 'Size BreakDown' (line detail) sheets together." onFile={onUpload} parsing={parsing} batches={batches} />
        </div>
      </div>
      <RevisionRibbon batches={batches} label="Firm order import" onDelete={onDelete} />
      {viewing && (
        <div className="section">
          <div className="section-head">
            <div className="section-title">Viewing — {viewing.weekLabel||viewing.fileName}</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="badge-count">{viewing.poCount} POs · {viewing.itemCount} items</span>
              {batches.length>1 && (
                <select value={viewing.id} onChange={e=>setViewId(e.target.value)}>
                  {batches.slice().reverse().map(b=><option key={b.id} value={b.id}>{b.weekLabel||b.fileName}{b.id===batches[batches.length-1].id?' (latest)':''}</option>)}
                </select>
              )}
            </div>
          </div>
          <div className="section-body table-scroll">
            <FirmOrderTable batch={viewing} />
          </div>
        </div>
      )}
    </div>
  );
}

function FirmOrderTable({batch}){
  const rows = batch.lines.slice(0,300);
  return (
    <table>
      <thead><tr><th>PO</th><th>Model</th><th>Item code</th><th>Size</th><th className="num">Order qty</th><th className="num">Remaining</th><th>EHD</th><th>Factory</th></tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i}>
            <td className="mono">{r.poNumber}</td><td>{r.model}</td><td className="mono">{r.itemCode}</td><td>{r.size}</td>
            <td className="num">{fmt(r.orderQty)}</td><td className="num">{fmt(r.remainingQty)}</td>
            <td>{r.ehd? new Date(r.ehd).toLocaleDateString():'—'}</td>
            <td>{r.orderMeta? r.orderMeta.factory : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GroupRow({depth,label,stats,expanded,onToggle,mono}){
  return (
    <tr className="group-row" onClick={onToggle} style={{cursor:'pointer'}}>
      <td colSpan={3} style={{paddingLeft:14+depth*20}}>
        <span className="group-caret">{expanded?'▾':'▸'}</span>
        <span className={mono?"mono":""} style={{fontWeight:depth===0?700:600}}>{label}</span>
        <span className="badge-count" style={{marginLeft:8}}>{stats.itemCount} item{stats.itemCount===1?'':'s'}</span>
      </td>
      <td className="num">{fmt(stats.forecastQty)}</td>
      <td className="num">{fmt(stats.firmQty)}</td>
      <td className="num" style={{color: stats.diff<0?'var(--red)': stats.diff>0?'var(--amber)':'var(--ink-soft)'}}>{stats.diff>0?'+':''}{fmt(stats.diff)}</td>
      <td></td>
      <td>
        {Object.entries(stats.statusCounts).map(([s,c])=>(
          <span key={s} style={{marginRight:4}} title={s}><Pill status={s} />{c>1?<span className="badge-count" style={{marginLeft:2}}>{c}</span>:null}</span>
        ))}
      </td>
    </tr>
  );
}

function GroupedComparisonTree({groupedData}){
  const [expanded,setExpanded] = useState(()=>new Set());
  const toggle = (key)=> setExpanded(prev=>{
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  const ccEntries = Object.entries(groupedData);
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th colSpan={3}>Iman CC / Model / Item</th><th className="num">Forecast</th><th className="num">Firm</th><th className="num">Diff</th><th className="num">%</th><th>Status</th></tr></thead>
        <tbody>
          {ccEntries.map(([cc,models])=>{
            const ccKey = 'cc:'+cc;
            const ccRows = Object.values(models).flatMap(items=>Object.values(items).flat());
            const ccStats = summarizeRows(ccRows);
            const ccOpen = expanded.has(ccKey);
            return (
              <React.Fragment key={ccKey}>
                <GroupRow depth={0} label={"CC "+cc} stats={ccStats} expanded={ccOpen} onToggle={()=>toggle(ccKey)} mono />
                {ccOpen && Object.entries(models).map(([model,items])=>{
                  const modelKey = ccKey+'|model:'+model;
                  const modelRows = Object.values(items).flat();
                  const modelStats = summarizeRows(modelRows);
                  const modelOpen = expanded.has(modelKey);
                  return (
                    <React.Fragment key={modelKey}>
                      <GroupRow depth={1} label={model} stats={modelStats} expanded={modelOpen} onToggle={()=>toggle(modelKey)} />
                      {modelOpen && Object.entries(items).map(([itemCode,rows])=>{
                        const itemStats = summarizeRows(rows);
                        const r0 = rows[0];
                        return (
                          <tr key={modelKey+'|item:'+itemCode}>
                            <td colSpan={3} style={{paddingLeft:14+2*20}}>
                              <span className="mono">{itemCode}</span>
                              {r0.modelName?<span style={{color:'var(--ink-soft)'}}> · {r0.modelName}</span>:null}
                              {r0.size?<span style={{color:'var(--ink-soft)'}}> · {r0.size}</span>:null}
                            </td>
                            <td className="num">{fmt(itemStats.forecastQty)}</td>
                            <td className="num">{fmt(itemStats.firmQty)}</td>
                            <td className="num" style={{color: itemStats.diff<0?'var(--red)': itemStats.diff>0?'var(--amber)':'var(--ink-soft)'}}>{itemStats.diff>0?'+':''}{fmt(itemStats.diff)}</td>
                            <td className="num">{itemStats.forecastQty>0? ((itemStats.diff/itemStats.forecastQty)*100).toFixed(0)+'%' : '—'}</td>
                            <td>{rows.map((r,i)=><Pill key={i} status={r.status} />)}</td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const DASH_STATUS_COLORS = {
  FIRMED:'#34d399', PARTIAL_FIRM:'#fbbf24', FORECAST_PENDING:'#64748b',
  OUT_OF_FORECAST:'#fb7185', UNEXPECTED_ORDER:'#fb7185',
};
const DASH_STATUS_LABELS = {
  FIRMED:'Firmed', PARTIAL_FIRM:'Partial firm', FORECAST_PENDING:'Forecast pending',
  OUT_OF_FORECAST:'Out of forecast', UNEXPECTED_ORDER:'Unexpected order',
};
function DashboardStatusFlow({comparison}){
  const counts = {};
  for(const r of comparison) counts[r.status] = (counts[r.status]||0)+1;
  const total = comparison.length || 1;
  const order = ['FIRMED','PARTIAL_FIRM','FORECAST_PENDING','OUT_OF_FORECAST','UNEXPECTED_ORDER'];
  const present = order.filter(s=>counts[s]>0);
  return (
    <div>
      <div className="flex h-8 w-full rounded overflow-hidden border border-slate-800">
        {present.map(s=>{
          const pct = counts[s]/total*100;
          return (
            <div key={s} title={`${DASH_STATUS_LABELS[s]}: ${counts[s]} (${pct.toFixed(1)}%)`}
              className="flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 overflow-hidden whitespace-nowrap"
              style={{flexBasis:pct+'%',background:DASH_STATUS_COLORS[s]}}>
              {pct>=8 ? pct.toFixed(0)+'%' : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-slate-400">
        {present.map(s=>(
          <div key={s} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{background:DASH_STATUS_COLORS[s]}}></span>
            {DASH_STATUS_LABELS[s]} — <span className="text-slate-300 font-mono">{counts[s]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardComparisonChart({comparison,groupBy}){
  const data = useMemo(()=>{
    const map = {};
    for(const r of comparison){
      const key = (groupBy==='model' ? r.model : r.imanCc) || r.itemCode || '—';
      if(!map[key]) map[key] = {key, forecastQty:0, firmQty:0};
      map[key].forecastQty += r.forecastQty;
      map[key].firmQty += r.firmQty;
    }
    return Object.values(map)
      .sort((a,b)=>(b.forecastQty+b.firmQty)-(a.forecastQty+a.firmQty))
      .slice(0,10);
  },[comparison,groupBy]);

  if(!data.length) return <div className="p-8 text-xs text-slate-400">No comparison data yet.</div>;
  const max = Math.max(1, ...data.map(d=>Math.max(d.forecastQty,d.firmQty)));

  return (
    <div>
      <div className="flex gap-5 text-[11px] text-slate-400 mb-4">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>Forecast qty</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-400"></span>Firm order qty</div>
      </div>
      {data.map(d=>(
        <div key={d.key} className="grid gap-2 items-center py-1.5" style={{gridTemplateColumns:'120px 1fr 90px'}}>
          <div className="text-xs text-slate-300 truncate" title={d.key}>{d.key || '(blank)'}</div>
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded bg-slate-800 overflow-hidden"><div className="h-full rounded bg-blue-500" style={{width:(d.forecastQty/max*100)+'%'}}></div></div>
            <div className="h-2 rounded bg-slate-800 overflow-hidden"><div className="h-full rounded bg-teal-400" style={{width:(d.firmQty/max*100)+'%'}}></div></div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 text-right">{fmt(d.forecastQty)} / {fmt(d.firmQty)}</div>
        </div>
      ))}
    </div>
  );
}

function DashboardWatchlist({comparison}){
  const today = new Date();
  const withEhd = comparison
    .filter(r=>r.diff<0 && r.ehd)
    .map(r=>{
      const d = new Date(r.ehd);
      const days = isNaN(d.getTime()) ? null : Math.ceil((d-today)/86400000);
      return {...r, daysToEhd:days};
    })
    .filter(r=>r.daysToEhd!=null && r.daysToEhd<=30)
    .sort((a,b)=>a.daysToEhd-b.daysToEhd)
    .slice(0,8);

  const list = withEhd.length ? withEhd :
    comparison.filter(r=>r.diff<0).sort((a,b)=>a.diff-b.diff).slice(0,8).map(r=>({...r,daysToEhd:null}));

  if(!list.length) return <div className="p-8 text-xs text-slate-400">No shortages detected — forecast and firm orders are aligned.</div>;

  return (
    <div className="divide-y divide-slate-800">
      {list.map(r=>(
        <div key={r.itemCode} className="flex items-center justify-between py-2.5 text-xs">
          <div className="min-w-0">
            <div className="text-slate-200 font-semibold truncate">{r.modelName || r.itemCode} <span className="text-slate-500 font-mono ml-1">{r.itemCode}</span></div>
            <div className="text-slate-500 mt-0.5">{r.model} {r.size?('· '+r.size):''}</div>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-rose-400 font-mono font-bold">{fmt(Math.abs(r.diff))} short</div>
            {r.daysToEhd!=null ? (
              <div className={"text-[10px] font-mono mt-0.5 "+(r.daysToEhd<=7?'text-rose-400':'text-amber-400')}>
                EHD {r.daysToEhd<0? Math.abs(r.daysToEhd)+'d overdue' : 'in '+r.daysToEhd+'d'}
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 mt-0.5">No EHD on file</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonPage({comparison,hasData}){
  const [statusFilter,setStatusFilter] = useState('ALL');
  const [q,setQ] = useState('');
  const [view,setView] = useState('flat'); // 'flat' | 'grouped'
  if(!hasData) return <div className="empty">Upload at least one <b>Forecast</b> file to see the comparison. Firm orders are optional — items will show as "Forecast pending" until matched.</div>;
  const filtered = comparison.filter(r=>{
    if(statusFilter!=='ALL' && r.status!==statusFilter) return false;
    if(q && !(r.itemCode.includes(q) || (r.modelName||'').toLowerCase().includes(q.toLowerCase()) || (r.model||'').includes(q))) return false;
    return true;
  });
  const groupedData = useMemo(()=>groupComparison(filtered),[filtered]);
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Forecast vs Firm Order</div>
        <span className="badge-count">{filtered.length} of {comparison.length} items</span>
      </div>
      <div className="section-body">
        <div className="filter-row">
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
            <option value="ALL">All statuses</option>
            <option value="FIRMED">Firmed</option>
            <option value="PARTIAL_FIRM">Partial firm</option>
            <option value="FORECAST_PENDING">Forecast pending</option>
            <option value="OUT_OF_FORECAST">Out of forecast</option>
            <option value="UNEXPECTED_ORDER">Unexpected order</option>
          </select>
          <input type="text" placeholder="Search item, model, style…" value={q} onChange={e=>setQ(e.target.value)} style={{width:220}} />
          <span style={{flex:1}}></span>
          <ExportButtons title="Forecast vs Firm" baseFilename="forecast-vs-firm" rows={filtered.map(r=>({
            Model:r.model, 'Item Name':r.modelName, Size:r.size, 'Item Code':r.itemCode,
            Forecast:r.forecastQty, Firm:r.firmQty, Diff:r.diff,
            '%':r.forecastQty>0? Number(r.pct.toFixed(1)) : '', Status:r.status,
          }))} />
          <button className={"btn"+(view==='flat'?" primary":"")} onClick={()=>setView('flat')}>Flat</button>
          <button className={"btn"+(view==='grouped'?" primary":"")} onClick={()=>setView('grouped')}>Grouped by CC</button>
        </div>
        {view==='flat' ? (
          <div className="table-scroll">
            <table>
              <thead><tr><th>Model</th><th>Item / size</th><th>Item code</th><th className="num">Forecast</th><th className="num">Firm</th><th className="num">Diff</th><th className="num">%</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.slice(0,400).map(r=>(
                  <tr key={r.itemCode}>
                    <td>{r.model}</td><td>{r.modelName}{r.size?(' · '+r.size):''}</td><td className="mono">{r.itemCode}</td>
                    <td className="num">{fmt(r.forecastQty)}</td><td className="num">{fmt(r.firmQty)}</td>
                    <td className="num" style={{color: r.diff<0?'var(--red)': r.diff>0?'var(--amber)':'var(--ink-soft)'}}>{r.diff>0?'+':''}{fmt(r.diff)}</td>
                    <td className="num">{r.forecastQty>0? r.pct.toFixed(0)+'%' : '—'}</td>
                    <td><Pill status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <GroupedComparisonTree groupedData={groupedData} />
        )}
      </div>
    </div>
  );
}

function balColor(v){ return v<0 ? 'var(--red)' : v>0 ? 'var(--green)' : 'var(--ink-soft)'; }

function NumCell({value,onChange,editable=true,bold,color}){
  return (
    <input type="number" className="cell-input" disabled={!editable}
      style={{fontWeight:bold?700:400, color: color||undefined}}
      value={value} onFocus={e=>e.target.select()}
      onChange={e=>onChange(e.target.value===''?0:Number(e.target.value))} />
  );
}

function PoUploadButton({onFile,busy}){
  const inputRef = React.useRef();
  return (
    <React.Fragment>
      <input ref={inputRef} type="file" accept=".xlsx,.xls" style={{display:'none'}} onChange={e=>{
        const f = e.target.files[0]; if(f) onFile(f); e.target.value='';
      }} />
      <button className="add-col-btn" onClick={()=>inputRef.current.click()} disabled={busy}>{busy? 'Uploading…' : 'Upload PO Excel'}</button>
    </React.Fragment>
  );
}

function TextKpiCard({label,value,onChange}){
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <input type="text" style={{width:'100%',border:'none',background:'transparent',fontSize:15,fontWeight:600,padding:'6px 0',fontFamily:'var(--font-ui)',color:'var(--ink)'}}
        value={value||''} onChange={e=>onChange(e.target.value)} placeholder="—" />
    </div>
  );
}
function EditableKpiCard({label,value,onChange,suffix}){
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <input type="number" className="cell-input" style={{width:'100%',textAlign:'left',fontSize:20,fontWeight:600,padding:'6px 0'}}
        value={value} onFocus={e=>e.target.select()} onChange={e=>onChange(e.target.value===''?0:Number(e.target.value))} />
      {suffix && <div className="kpi-foot">{suffix}</div>}
    </div>
  );
}

// Style-scoped summary — the ONLY KPI surface on the Accessories page. Always exactly one style,
// never combined totals. Re-renders automatically whenever `style` (the currently open style) changes.
function StyleSummaryPanel({style,firmOrderBatches,shipmentBatches,onUpdate}){
  if(!style){
    return <div className="empty">Open a style below to view its planning summary — one style at a time, never combined totals.</div>;
  }
  const calc = computeStyleCalc(style);
  const summary = computeStyleSummary(style, firmOrderBatches, calc, shipmentBatches);
  const field = (f,v)=> onUpdate(st=>({...st,[f]:v}));

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Style Level Planning Summary — <span className="mono">{style.styleNo}</span> <span style={{color:'var(--ink-soft)',fontWeight:500}}>{style.description}</span></div>
        <PlanningStatusPill status={summary.status} />
      </div>
      <div className="section-body">
        <div className="acc-subhead"><span>Planning Summary</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <TextKpiCard label="Season" value={style.season} onChange={v=>field('season',v)} />
          <TextKpiCard label="Buyer" value={style.buyer} onChange={v=>field('buyer',v)} />
          <TextKpiCard label="Style Number" value={style.styleNo} onChange={v=>field('styleNo',v)} />
          <TextKpiCard label="Style Description" value={style.description} onChange={v=>field('description',v)} />
          <TextKpiCard label="Colour" value={style.color} onChange={v=>field('color',v)} />
          <TextKpiCard label="Factory" value={style.factory} onChange={v=>field('factory',v)} />
          <TextKpiCard label="Country" value={style.country} onChange={v=>field('country',v)} />
        </div>

        <div className="acc-subhead"><span>Planning Information</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <EditableKpiCard label="Selection Qty" value={style.selectionQty} onChange={v=>field('selectionQty',v)} />
          <EditableKpiCard label="SMT Commitment %" value={style.smtCommitmentPct} onChange={v=>field('smtCommitmentPct',v)} suffix="%" />
          <EditableKpiCard label="Fabric Commitment Qty" value={style.fabricCommitmentQty} onChange={v=>field('fabricCommitmentQty',v)} />
          <EditableKpiCard label="Accessory Commitment %" value={style.accCommitmentPct} onChange={v=>field('accCommitmentPct',v)} suffix="%" />
          <EditableKpiCard label="Accessory Commitment Qty" value={style.accCommitmentQty} onChange={v=>field('accCommitmentQty',v)} />
        </div>

        <div className="acc-subhead"><span>Order Status</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <KpiCard label="Total Firm Orders Received" value={fmt(summary.totalFirmOrdersReceived)} />
          <KpiCard label="Balance Orders to Receive" value={fmt(summary.balanceOrdersToReceive)} tone={summary.balanceOrdersToReceive>0?'amber':'green'} foot="Selection Qty − Firm Orders Received" />
        </div>

        <div className="acc-subhead"><span>FG Stock</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <EditableKpiCard label="Previous Season FG Stock" value={style.prevSeasonFgStock} onChange={v=>field('prevSeasonFgStock',v)} />
          <KpiCard label="Need New Production" value={fmt(summary.needNewProduction)} tone={summary.needNewProduction>0?'amber':'green'} foot="Firm Orders Received − Previous Season FG Stock" />
        </div>

        <div className="acc-subhead"><span>Accessories</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <KpiCard label="Accessories Ordered" value={fmt(summary.accessoriesOrdered)} />
          <KpiCard label="Accessories Received" value={fmt(summary.accessoriesReceived)} />
          <KpiCard label="Accessories Issued" value={fmt(summary.accessoriesIssued)} />
          <KpiCard label="Warehouse Balance" value={fmt(summary.warehouseBalance)} tone={summary.warehouseBalance<0?'red':'green'} />
          <KpiCard label="Factory Balance" value={fmt(summary.factoryBalance)} />
          <KpiCard label="Need to Purchase" value={fmt(summary.needToPurchase)} tone={summary.needToPurchase>0?'red':'green'} />
        </div>

        <div className="acc-subhead"><span>Shipment</span></div>
        <div className="kpi-grid" style={{marginBottom:18}}>
          <KpiCard label="Total Shipped Qty" value={fmt(summary.shipment.totalShippedQty)} />
          <KpiCard label="Balance to Ship" value={fmt(summary.shipment.balanceToShip)} tone={summary.shipment.balanceToShip>0?'amber':'green'} />
          <KpiCard label="Shipment %" value={(summary.shipment.shipmentPct*100).toFixed(0)+'%'} tone={summary.shipment.shipmentPct>=1?'green':summary.shipment.shipmentPct>=0.6?'amber':'red'} />
          <KpiCard label="Last Shipment Date" value={summary.shipment.lastShipmentDate? new Date(summary.shipment.lastShipmentDate).toLocaleDateString() : '—'} />
          <KpiCard label="Next Shipment Date" value={summary.shipment.nextShipmentDate? new Date(summary.shipment.nextShipmentDate).toLocaleDateString() : '—'} />
          <div className="kpi-card">
            <div className="kpi-label">Company</div>
            <select value={style.company||''} onChange={e=>field('company',e.target.value)} style={{width:'100%',border:'none',background:'transparent',fontSize:15,fontWeight:600,padding:'6px 0',fontFamily:'var(--font-ui)',color:'var(--ink)'}}>
              <option value="">—</option>
              <option value="EMBEE">EMBEE</option>
              <option value="GLOBE">GLOBE</option>
            </select>
          </div>
        </div>

        <div className="acc-subhead"><span>Production Information</span></div>
        <div className="kpi-grid">
          <EditableKpiCard label="Production Completed" value={style.productionCompletedQty} onChange={v=>field('productionCompletedQty',v)} />
          <EditableKpiCard label="Shipment Completed" value={style.shipmentCompletedQty} onChange={v=>field('shipmentCompletedQty',v)} />
        </div>
      </div>
    </div>
  );
}

function AccessoriesPage({styles,setStyles,firmOrderBatches,shipmentBatches}){
  const [query,setQuery] = useState('');
  const [openId,setOpenId] = useState(styles[0]? styles[0].id : null);

  const updateStyle = useCallback((id,updater)=>{
    setStyles(prev=>{
      const next = prev.map(st=> st.id===id ? updater(st) : st);
      storeSet('accessory-styles',next,true);
      return next;
    });
  },[setStyles]);

  const addStyle = ()=>{
    const id = 'st_'+Date.now();
    const blank = {id, styleNo:'NEW', description:'New style — click to rename', r3Code:'', selectionQty:0,
      ...blankStyleMeta(),
      weeks:[{id:'wk_'+Date.now(),label:'WK01',qty:zeroSizes()}], pos:[], fgStock:zeroSizes(), issues:[]};
    setStyles(prev=>{ const next=[...prev,blank]; storeSet('accessory-styles',next,true); return next; });
    setOpenId(id);
  };
  const deleteStyle = (id)=>{
    if(!confirm('Remove this style from the planning grid?')) return;
    setStyles(prev=>{ const next=prev.filter(s=>s.id!==id); storeSet('accessory-styles',next,true); return next; });
  };

  const filtered = styles.filter(s=> !query || (s.styleNo+' '+s.description).toLowerCase().includes(query.toLowerCase()));
  const openStyle = styles.find(s=>s.id===openId) || null;

  return (
    <div>
      <div className="filter-row">
        <input type="text" placeholder="Search style # or description…" value={query} onChange={e=>setQuery(e.target.value)} style={{minWidth:260}} />
        <button className="btn primary add-style-btn" onClick={addStyle}>+ Add style</button>
        <span className="badge-count">{filtered.length} style{filtered.length!==1?'s':''}</span>
        <span style={{flex:1}}></span>
      </div>

      <div style={{marginBottom:20}}>
        <StyleSummaryPanel style={openStyle} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches}
          onUpdate={openStyle ? (updater=>updateStyle(openStyle.id,updater)) : (()=>{})} />
      </div>

      {filtered.length===0 && <div className="empty">No styles yet. <b>Add a style</b> to start planning accessories.</div>}

      {filtered.map(st=>(
        <StyleCard key={st.id} style={st} calc={computeStyleCalc(st)} open={openId===st.id}
          onToggle={()=>setOpenId(openId===st.id? null : st.id)}
          onUpdate={updater=>updateStyle(st.id,updater)}
          onDelete={()=>deleteStyle(st.id)} />
      ))}
    </div>
  );
}

function StyleCard({style,calc,open,onToggle,onUpdate,onDelete}){
  const [uploadState,setUploadState] = useState({busy:false,error:null,info:null});
  const field = (f,v)=> onUpdate(st=>({...st,[f]:v}));
  const setWeekQty = (weekId,size,val)=> onUpdate(st=>({...st,weeks:st.weeks.map(w=>w.id===weekId?{...w,qty:{...w.qty,[size]:val}}:w)}));
  const setWeekLabel = (weekId,val)=> onUpdate(st=>({...st,weeks:st.weeks.map(w=>w.id===weekId?{...w,label:val}:w)}));
  const addWeek = ()=> onUpdate(st=>({...st,weeks:[...st.weeks,{id:'wk_'+Date.now(),label:'WK'+(st.weeks.length+1),qty:zeroSizes()}]}));
  const removeWeek = (weekId)=> onUpdate(st=>({...st,weeks:st.weeks.filter(w=>w.id!==weekId)}));

  const setPoField = (poId,f,val)=> onUpdate(st=>({...st,pos:st.pos.map(p=>p.id===poId?{...p,[f]:val}:p)}));
  const setPoReceived = (poId,size,val)=> onUpdate(st=>({...st,pos:st.pos.map(p=>p.id===poId?{...p,received:{...p.received,[size]:val}}:p)}));
  const addPo = ()=> onUpdate(st=>({...st,pos:[...st.pos,{id:'po_'+Date.now(),poNumber:'',deliveredThird:'',ehd:'',garmentOrderQty:0,received:zeroSizes()}]}));
  const removePo = (poId)=> onUpdate(st=>({...st,pos:st.pos.filter(p=>p.id!==poId)}));

  const handlePoFile = async (file)=>{
    setUploadState({busy:true,error:null,info:null});
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const rows = parsePOUploadWorkbook(wb);
      let added=0, updated=0;
      onUpdate(st=>{
        const pos = [...st.pos];
        rows.forEach((r,i)=>{
          const idx = pos.findIndex(p=>p.poNumber && p.poNumber===r.poNumber);
          if(idx>=0){
            pos[idx] = {...pos[idx], deliveredThird:r.deliveredThird||pos[idx].deliveredThird, ehd:r.ehd||pos[idx].ehd,
              garmentOrderQty:r.garmentOrderQty, received:r.received};
            updated++;
          } else {
            pos.push({id:'po_'+Date.now()+'_'+i, poNumber:r.poNumber, deliveredThird:r.deliveredThird, ehd:r.ehd,
              garmentOrderQty:r.garmentOrderQty, received:r.received});
            added++;
          }
        });
        return {...st,pos};
      });
      setUploadState({busy:false,error:null,info:`${added} PO${added!==1?'s':''} added, ${updated} updated from ${file.name}.`});
    }catch(e){
      setUploadState({busy:false,error:e.message,info:null});
    }
  };

  const setFgStock = (size,val)=> onUpdate(st=>({...st,fgStock:{...st.fgStock,[size]:val}}));

  const setIssueQty = (isId,size,val)=> onUpdate(st=>({...st,issues:st.issues.map(is=>is.id===isId?{...is,qty:{...is.qty,[size]:val}}:is)}));
  const setIssueLabel = (isId,val)=> onUpdate(st=>({...st,issues:st.issues.map(is=>is.id===isId?{...is,label:val}:is)}));
  const addIssue = ()=> onUpdate(st=>({...st,issues:[...st.issues,{id:'is_'+Date.now(),label:'Order '+(st.issues.length+1),qty:zeroSizes()}]}));
  const removeIssue = (isId)=> onUpdate(st=>({...st,issues:st.issues.filter(is=>is.id!==isId)}));

  return (
    <div className={"acc-card"+(open?" open":"")}>
      <div className="acc-card-head" onClick={onToggle}>
        <span className="acc-caret">▶</span>
        <input className="acc-style-no-input" value={style.styleNo} onClick={e=>e.stopPropagation()} onChange={e=>field('styleNo',e.target.value)} />
        <input className="acc-style-desc-input" value={style.description} onClick={e=>e.stopPropagation()} onChange={e=>field('description',e.target.value)} placeholder="Style description" />
        <span className="acc-kpi-badge">Commit {(calc.kpi.pctOrdered*100).toFixed(1)}%</span>
        <span className={"acc-kpi-badge "+(calc.kpi.accBalanceToOrderKpi<0?'red':'green')}>Bal. to order {fmt(calc.kpi.accBalanceToOrderKpi)}</span>
        <span className={"acc-kpi-badge "+(calc.totals.needToIssue>0?'red':'green')}>Need to issue {fmt(calc.totals.needToIssue)}</span>
        <button className="icon-btn" onClick={e=>{e.stopPropagation();onDelete();}} title="Remove style">✕</button>
      </div>

      {open && (
        <div className="acc-card-body">
          <div className="acc-subhead">
            <span>PO tracking (Delivery-wise priority)</span>
            <span style={{display:'flex',gap:8,alignItems:'center'}}>
              <button className="add-col-btn" onClick={()=>downloadPOTemplate()}>Download template</button>
              <PoUploadButton onFile={handlePoFile} busy={uploadState.busy} />
              <button className="add-col-btn" onClick={addPo}>+ Add PO</button>
            </span>
          </div>
          {uploadState.error && <div className="foot-note" style={{color:'var(--red)',marginTop:0}}>{uploadState.error}</div>}
          {uploadState.info && <div className="foot-note" style={{color:'var(--green)',marginTop:0}}>{uploadState.info}</div>}
          <div className="foot-note" style={{marginTop:0,marginBottom:10}}>Upload expects columns: <span className="mono">PO Number, Delivered Third, EHD, Garment Order Qty</span>, then one column per size (<span className="mono">S, M, L, XL, 2XL, 3XL, 4XL</span>). Matching PO numbers update in place; new ones are added.</div>
          <div className="table-scroll">
            <table className="po-mini-table">
              <thead><tr><th className="lbl">PO#</th><th className="lbl">Delivered Third</th><th className="lbl">EHD</th><th>Garment Order Qty</th><th></th></tr></thead>
              <tbody>
                {style.pos.map(p=>(
                  <tr key={p.id}>
                    <td><input type="text" value={p.poNumber} onChange={e=>setPoField(p.id,'poNumber',e.target.value)} placeholder="PO number" /></td>
                    <td><input type="text" value={p.deliveredThird} onChange={e=>setPoField(p.id,'deliveredThird',e.target.value)} placeholder="Third party" /></td>
                    <td><input type="date" value={p.ehd} onChange={e=>setPoField(p.id,'ehd',e.target.value)} /></td>
                    <td><input type="number" value={p.garmentOrderQty} onFocus={e=>e.target.select()} onChange={e=>setPoField(p.id,'garmentOrderQty',e.target.value===''?0:Number(e.target.value))} /></td>
                    <td><button className="icon-btn" onClick={()=>removePo(p.id)}>✕</button></td>
                  </tr>
                ))}
                {style.pos.length===0 && <tr><td colSpan="5" className="empty" style={{padding:'12px'}}>No POs yet — add one, and it becomes an Orders-Received column below automatically.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="acc-subhead">
            <span>Table 1 — Acc. Ordered Qty / Orders Received / Balance to Order / FG Stock</span>
            <button className="add-col-btn" onClick={addWeek}>+ Add week</button>
          </div>
          <div className="table-scroll">
            <table className="grid-table">
              <thead>
                <tr>
                  <th className="stickycol lbl">Size</th>
                  {style.weeks.map(w=>(
                    <th key={w.id}>
                      <input className="col-head-label" value={w.label} onChange={e=>setWeekLabel(w.id,e.target.value)} />
                      {style.weeks.length>1 && <span className="icon-btn" onClick={()=>removeWeek(w.id)} style={{marginLeft:2}}>✕</span>}
                    </th>
                  ))}
                  <th>Ttl Acc Ordered Qty</th>
                  <th className="col-divider"></th>
                  {style.pos.map(p=>(<th key={p.id}>{p.poNumber||'PO'}</th>))}
                  <th>Ttl</th>
                  <th>Acc. Balance to Order</th>
                  <th>FG Stock</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(size=>(
                  <tr key={size}>
                    <td className="stickycol">{size}</td>
                    {style.weeks.map(w=>(
                      <td key={w.id}><NumCell value={w.qty[size]} onChange={val=>setWeekQty(w.id,size,val)} /></td>
                    ))}
                    <td><NumCell value={calc.orderedTotal[size]} editable={false} bold /></td>
                    <td className="col-divider"></td>
                    {style.pos.map(p=>(
                      <td key={p.id}><NumCell value={p.received[size]} onChange={val=>setPoReceived(p.id,size,val)} /></td>
                    ))}
                    <td><NumCell value={calc.receivedTotal[size]} editable={false} bold /></td>
                    <td><NumCell value={calc.balanceToOrder[size]} editable={false} bold color={balColor(calc.balanceToOrder[size])} /></td>
                    <td><NumCell value={style.fgStock[size]} onChange={val=>setFgStock(size,val)} /></td>
                  </tr>
                ))}
                <tr className="grid-total-row">
                  <td className="stickycol">Total</td>
                  {style.weeks.map(w=>(<td key={w.id}><NumCell value={sizeSum(w.qty)} editable={false} bold /></td>))}
                  <td><NumCell value={calc.totals.ordered} editable={false} bold /></td>
                  <td className="col-divider"></td>
                  {style.pos.map(p=>(<td key={p.id}><NumCell value={sizeSum(p.received)} editable={false} bold /></td>))}
                  <td><NumCell value={calc.totals.received} editable={false} bold /></td>
                  <td><NumCell value={calc.totals.balanceToOrder} editable={false} bold color={balColor(calc.totals.balanceToOrder)} /></td>
                  <td><NumCell value={calc.totals.fgStock} editable={false} bold /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="acc-subhead">
            <span>Table 2 — Acc. Stock / Order Issued to Fty / Balance Acc. Stock / Need to Issue</span>
            <button className="add-col-btn" onClick={addIssue}>+ Add order batch</button>
          </div>
          <div className="table-scroll">
            <table className="grid-table">
              <thead>
                <tr>
                  <th className="stickycol lbl">Size</th>
                  <th>Acc Ordered Qty</th>
                  <th className="col-divider"></th>
                  {style.issues.map(is=>(
                    <th key={is.id}>
                      <input className="col-head-label" value={is.label} onChange={e=>setIssueLabel(is.id,e.target.value)} />
                      <span className="icon-btn" onClick={()=>removeIssue(is.id)} style={{marginLeft:2}}>✕</span>
                    </th>
                  ))}
                  <th>Ttl</th>
                  <th>Balance Acc. Stock</th>
                  <th>Need to Issue to Fty</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(size=>(
                  <tr key={size}>
                    <td className="stickycol">{size}</td>
                    <td><NumCell value={calc.orderedTotal[size]} editable={false} bold /></td>
                    <td className="col-divider"></td>
                    {style.issues.map(is=>(
                      <td key={is.id}><NumCell value={is.qty[size]} onChange={val=>setIssueQty(is.id,size,val)} /></td>
                    ))}
                    <td><NumCell value={calc.issuedTotal[size]} editable={false} bold /></td>
                    <td><NumCell value={calc.balanceAccStock[size]} editable={false} bold color={balColor(calc.balanceAccStock[size])} /></td>
                    <td><NumCell value={calc.needToIssue[size]} editable={false} bold color={balColor(-calc.needToIssue[size])} /></td>
                  </tr>
                ))}
                <tr className="grid-total-row">
                  <td className="stickycol">Total</td>
                  <td><NumCell value={calc.totals.ordered} editable={false} bold /></td>
                  <td className="col-divider"></td>
                  {style.issues.map(is=>(<td key={is.id}><NumCell value={sizeSum(is.qty)} editable={false} bold /></td>))}
                  <td><NumCell value={calc.totals.issued} editable={false} bold /></td>
                  <td><NumCell value={calc.totals.balanceAccStock} editable={false} bold color={balColor(calc.totals.balanceAccStock)} /></td>
                  <td><NumCell value={calc.totals.needToIssue} editable={false} bold color={balColor(-calc.totals.needToIssue)} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="foot-note" style={{marginTop:2}}>Full commitment &amp; planning KPIs for this style are shown in the <b>Style Level Planning Summary</b> panel above.</div>
        </div>
      )}
    </div>
  );
}

// ---------- Auth UI ----------
function resizeImageToDataUrl(file, maxDim, quality){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onerror = ()=>reject(new Error('Could not read file'));
    reader.onload = ()=>{
      const img = new Image();
      img.onerror = ()=>reject(new Error('Could not read image'));
      img.onload = ()=>{
        const scale = Math.min(1, maxDim/Math.max(img.width,img.height));
        const w = Math.max(1,Math.round(img.width*scale)), h = Math.max(1,Math.round(img.height*scale));
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        // center-crop the (already downscaled) image to a square, then draw into the final square canvas
        const side = Math.min(w,h);
        const squareCanvas = document.createElement('canvas');
        squareCanvas.width = maxDim; squareCanvas.height = maxDim;
        squareCanvas.getContext('2d').drawImage(canvas, (w-side)/2, (h-side)/2, side, side, 0, 0, maxDim, maxDim);
        resolve(squareCanvas.toDataURL('image/jpeg', quality||0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function Avatar({user, size}){
  size = size||24;
  if(user && user.avatarDataUrl) return <img src={user.avatarDataUrl} alt="" style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',flexShrink:0}} />;
  return <div className="user-badge-avatar" style={{width:size,height:size,fontSize:Math.round(size*0.46)}}>{(user&&user.displayName||'?').trim().slice(0,1).toUpperCase()}</div>;
}
function ProfileMenu({user, onSave, onClose}){
  const inputRef = React.useRef();
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const pick = async (file)=>{
    if(!file) return;
    if(!file.type.startsWith('image/')) return setError('Please choose an image file.');
    setBusy(true); setError('');
    try{
      const dataUrl = await resizeImageToDataUrl(file, 160, 0.75);
      await onSave({avatarDataUrl:dataUrl});
    }catch(e){ setError('Could not process that image.'); }
    setBusy(false);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{maxWidth:320,position:'relative',textAlign:'center'}} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>Your profile photo</div>
        <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
          <Avatar user={user} size={88} />
        </div>
        <input ref={inputRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>pick(e.target.files[0])} />
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <button className="btn primary" disabled={busy} onClick={()=>inputRef.current.click()}>{busy?'Uploading…':'Upload photo'}</button>
          {user.avatarDataUrl && <button className="btn" disabled={busy} onClick={()=>onSave({avatarDataUrl:null})}>Remove</button>}
        </div>
        {error && <div className="login-error" style={{marginTop:12}}>{error}</div>}
        <div style={{fontSize:11,color:'var(--ink-faint)',marginTop:14}}>Square photos work best — this gets cropped and resized automatically.</div>
      </div>
    </div>
  );
}
function LoginScreen({users, onLogin, onCreateFirstAdmin}){
  const isFirstRun = users.length===0;
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [displayName,setDisplayName] = useState('');
  const [confirmPw,setConfirmPw] = useState('');
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);

  const submit = async (e)=>{
    e.preventDefault();
    setError('');
    if(isFirstRun){
      if(!username.trim()||!password||!displayName.trim()) return setError('Fill in every field.');
      if(password.length<4) return setError('Password should be at least 4 characters.');
      if(password!==confirmPw) return setError('Passwords do not match.');
      setBusy(true);
      await onCreateFirstAdmin({username:username.trim(),password,displayName:displayName.trim()});
      setBusy(false);
    } else {
      if(!username.trim()||!password) return setError('Enter your username and password.');
      setBusy(true);
      const ok = await onLogin(username.trim(),password);
      setBusy(false);
      if(!ok) setError('Incorrect username or password.');
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="login-logo">
          <img src={LOGO_DATA_URI} alt="EMBEE" />
          <div><div className="login-brand">EMBEE</div><div className="login-brand-sub">Merchandising Planning</div></div>
        </div>
        {isFirstRun ? (
          <React.Fragment>
            <div className="login-title">Set up the first admin account</div>
            <div className="login-hint">No users exist yet — create the account that will manage everyone else's access.</div>
            <label>Your name</label>
            <input type="text" value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="e.g. Priya Sharma" autoFocus />
            <label>Username</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="e.g. priya" />
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 4 characters" />
            <label>Confirm password</label>
            <input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="login-title">Sign in</div>
            <label>Username</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} autoFocus />
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </React.Fragment>
        )}
        {error && <div className="login-error">{error}</div>}
        <button type="submit" className="btn primary" disabled={busy} style={{width:'100%',justifyContent:'center',marginTop:6}}>
          {busy? 'Please wait…' : isFirstRun? 'Create admin account' : 'Sign in'}
        </button>
        <div className="login-footnote">This is a browser-side login for keeping casual visitors out — it isn't server-verified security. Don't rely on it to protect highly sensitive data from a determined user with developer tools.</div>
      </form>
    </div>
  );
}

function UserManagementPage({users, currentUser, onAddUser, onRemoveUser, onChangeRole, onChangePassword}){
  const [displayName,setDisplayName] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('editor');
  const [isAdmin,setIsAdmin] = useState(false);
  const [moduleAccess,setModuleAccess] = useState(()=>Object.fromEntries(MODULE_LIST.map(m=>[m.key,true])));
  const [error,setError] = useState('');
  const [expandedId,setExpandedId] = useState(null);
  const [revealedIds,setRevealedIds] = useState(()=>new Set());
  const [pwEditId,setPwEditId] = useState(null);
  const [newPassword,setNewPassword] = useState('');
  const [pwError,setPwError] = useState('');

  const toggleReveal = (id)=>{
    setRevealedIds(prev=>{
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const startPwEdit = (id)=>{ setPwEditId(id); setNewPassword(''); setPwError(''); };
  const savePwEdit = async (id)=>{
    if(newPassword.length<4) return setPwError('At least 4 characters.');
    await onChangePassword(id,newPassword);
    setPwEditId(null); setNewPassword(''); setPwError('');
    setRevealedIds(prev=>new Set(prev).add(id)); // show it right away so the admin can confirm/share it
  };

  const submit = async ()=>{
    setError('');
    if(!displayName.trim()||!username.trim()||!password) return setError('Fill in every field.');
    if(users.some(u=>u.username.toLowerCase()===username.trim().toLowerCase())) return setError('That username is already taken.');
    await onAddUser({displayName:displayName.trim(),username:username.trim(),password,role,isAdmin,moduleAccess});
    setDisplayName(''); setUsername(''); setPassword(''); setRole('editor'); setIsAdmin(false);
    setModuleAccess(Object.fromEntries(MODULE_LIST.map(m=>[m.key,true])));
  };

  // Merge a user's stored access with the full-access default so every module has an
  // explicit true/false to toggle, even for legacy users who never had this field.
  const accessOf = (u)=> ({...Object.fromEntries(MODULE_LIST.map(m=>[m.key,true])), ...(u.moduleAccess||{})});
  const toggleUserModule = (u,key,checked)=>{
    onChangeRole(u.id, {moduleAccess:{...accessOf(u), [key]:checked}});
  };
  const moduleSummary = (u)=>{
    if(u.isAdmin) return 'All modules (admin)';
    const acc = accessOf(u);
    const on = MODULE_LIST.filter(m=>acc[m.key]!==false).length;
    if(on===MODULE_LIST.length) return 'All modules';
    if(on===0) return 'No modules';
    return `${on} of ${MODULE_LIST.length} modules`;
  };

  return (
    <div>
      <div className="section" style={{marginBottom:16}}>
        <div className="section-head"><div className="section-title">Add a user</div></div>
        <div className="section-body">
          <div className="intel-form-grid">
            <input type="text" placeholder="Full name" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
            <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <select value={role} onChange={e=>setRole(e.target.value)}>
              <option value="editor">Editor — can add/edit/delete</option>
              <option value="viewer">Viewer — read-only</option>
            </select>
          </div>
          <label style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12.5,marginBottom:12}}>
            <input type="checkbox" checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)} /> Also make this user an admin (can manage other users)
          </label>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--ink-soft)',textTransform:'uppercase',letterSpacing:'.03em',marginBottom:7}}>Module access</div>
            {isAdmin ? (
              <div className="foot-note">Admins automatically get every module — nothing to pick here.</div>
            ) : (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:'6px 14px'}}>
                {MODULE_LIST.map(m=>(
                  <label key={m.key} style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5}}>
                    <input type="checkbox" checked={!!moduleAccess[m.key]}
                      onChange={e=>setModuleAccess(prev=>({...prev,[m.key]:e.target.checked}))} />
                    {m.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          {error && <div className="login-error" style={{marginBottom:10}}>{error}</div>}
          <div><button className="btn primary" onClick={submit}><Icon name="plus" size={14}/> Add user</button></div>
        </div>
      </div>
      <div className="section">
        <div className="section-head"><div className="section-title">Users <span className="badge-count">{users.length}</span></div></div>
        <div className="section-body table-scroll">
          <table>
            <thead><tr><th>Name</th><th>Username</th><th>Password</th><th>Role</th><th>Admin</th><th>Modules</th><th></th></tr></thead>
            <tbody>
              {users.map(u=>(
                <React.Fragment key={u.id}>
                <tr>
                  <td style={{display:'flex',alignItems:'center',gap:8}}>
                    <Avatar user={u} size={26} />
                    {u.displayName}{u.id===currentUser.id && <span className="badge-count" style={{marginLeft:6}}>You</span>}
                  </td>
                  <td className="mono">{u.username}</td>
                  <td>
                    {pwEditId===u.id ? (
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <input type="text" autoFocus placeholder="New password" value={newPassword}
                          onChange={e=>setNewPassword(e.target.value)} style={{width:120,fontSize:12}} />
                        <button type="button" className="btn primary" style={{padding:'4px 9px',fontSize:11}} onClick={()=>savePwEdit(u.id)}>Save</button>
                        <button type="button" className="icon-btn" title="Cancel" onClick={()=>{setPwEditId(null); setNewPassword(''); setPwError('');}}>✕</button>
                        {pwError && <span style={{color:'var(--red)',fontSize:11}}>{pwError}</span>}
                      </div>
                    ) : (
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <span className="mono" style={{fontSize:12,minWidth:78,display:'inline-block'}}>
                          {revealedIds.has(u.id) ? (u.passwordPlain || '(reset to view)') : '••••••••'}
                        </span>
                        {u.passwordPlain && (
                          <button type="button" className="icon-btn" title={revealedIds.has(u.id)?'Hide password':'Show password'} onClick={()=>toggleReveal(u.id)}>
                            <Icon name={revealedIds.has(u.id)?'eyeOff':'eye'} size={14}/>
                          </button>
                        )}
                        <button type="button" className="icon-btn" title="Set a new password" onClick={()=>startPwEdit(u.id)}>
                          <Icon name="edit" size={14}/>
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <select value={u.role} onChange={e=>onChangeRole(u.id,{role:e.target.value})}>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                  <td>
                    <input type="checkbox" checked={!!u.isAdmin} onChange={e=>onChangeRole(u.id,{isAdmin:e.target.checked})} disabled={u.id===currentUser.id} />
                  </td>
                  <td>
                    {u.isAdmin ? (
                      <span style={{fontSize:12,color:'var(--ink-faint)'}}>{moduleSummary(u)}</span>
                    ) : (
                      <button type="button" className="btn" style={{fontSize:11.5,padding:'4px 10px'}} onClick={()=>setExpandedId(expandedId===u.id?null:u.id)}>
                        {moduleSummary(u)} <Icon name="chevronDown" size={12} style={expandedId===u.id?{transform:'rotate(180deg)'}:undefined}/>
                      </button>
                    )}
                  </td>
                  <td>
                    {u.id!==currentUser.id && (
                      <button className="icon-btn" title="Remove user"
                        onClick={()=>{ if(window.confirm(`Remove ${u.displayName} (${u.username})? They will no longer be able to sign in.`)) onRemoveUser(u.id); }}>✕</button>
                    )}
                  </td>
                </tr>
                {expandedId===u.id && !u.isAdmin && (
                  <tr>
                    <td colSpan={7} style={{background:'var(--surface-alt)'}}>
                      <div style={{padding:'10px 4px',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:'6px 14px'}}>
                        {MODULE_LIST.map(m=>{
                          const acc = accessOf(u);
                          return (
                            <label key={m.key} style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5}}>
                              <input type="checkbox" checked={acc[m.key]!==false}
                                onChange={e=>toggleUserModule(u,m.key,e.target.checked)} />
                              {m.label}
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="foot-note">
            Passwords are stored in this browser-side data store so they can be shown here — the same soft, client-side
            login this app has always used (see the sign-in screen note), not a server-verified security system. Anyone
            with admin access can view or reset any password. Use the pencil icon to set a new one at any time.
          </div>
        </div>
      </div>
    </div>
  );
}


// ================================================================================
// Documents → PO PDF Editor
// Detects and covers confidential fields (delivery date, unit/total price,
// bottom contact/comment block) on Decathlon PO PDFs, per-page, using pdf.js for
// text-position detection and pdf-lib to draw redaction rectangles directly onto
// the original vector PDF (so layout, fonts, logo and barcodes are untouched and
// nothing is rasterized unless the user exports to JPEG/PNG).
// ================================================================================

function fmtBytes(n){
  if(n==null) return '';
  if(n<1024) return n+' B';
  if(n<1024*1024) return (n/1024).toFixed(1)+' KB';
  return (n/(1024*1024)).toFixed(2)+' MB';
}

// Find the first text item on a page whose string (case-insensitive) contains `needle`.
// Decathlon's PO template renders some labels ("Delivery Date", "VAT Number") as
// individually letter-spaced glyph runs (e.g. "D e l i v e r y D a t e :"), so
// comparisons strip all internal whitespace before matching.
function normForMatch(s){ return (s||'').replace(/\s+/g,'').toLowerCase(); }
// Matches only when the label sits at the very start of the text run — this is what
// distinguishes the real "Delivery Date :" field label from incidental occurrences
// of the same words inside body copy, e.g. "thanks to confirm the delivery date!".
function findItem(items, needle){
  const low = normForMatch(needle);
  return items.find(it => normForMatch(it.str).startsWith(low));
}
function itemHeight(it){
  return (it.height && it.height>0) ? it.height : Math.abs(it.transform[3])*1.15 || 10;
}

// Reads the PO number printed at the top of a Decathlon PO sheet, right under the
// "Purchase Order (Work & Delivery Request)" title, e.g. "n° 1130224857". Used to
// name each page's file automatically when exporting POs one-by-one.
// Groups text items into lines (by shared y-position), scanning from the top of
// the page down, and matches the first line that looks like "n° <digits>" —
// tolerant of the degree sign being rendered as °, º, or a stray "o"/"0", and of
// the label and number sitting in one text run or being split across several.
function extractPoNumber(items, pageHeight){
  const usable = (items||[]).filter(it=>(it.str||'').trim().length>0 && it.transform);
  if(usable.length===0) return null;
  const byLine = [];
  usable.slice().sort((a,b)=> b.transform[5]-a.transform[5] || a.transform[4]-b.transform[4])
    .forEach(it=>{
      const y = it.transform[5];
      let line = byLine.find(l=>Math.abs(l.y-y)<2.5);
      if(!line){ line = { y, items:[] }; byLine.push(line); }
      line.items.push(it);
    });
  const PO_RE = /n[°ºo0]{1,2}[:.\-]?(\d{6,})/i;
  function lineText(line){
    return line.items.slice().sort((a,b)=>a.transform[4]-b.transform[4]).map(it=>it.str).join('').replace(/\s+/g,'');
  }
  // Prefer a match near the top of the page (the title/PO-number band), then fall
  // back to scanning the whole page in case the layout shifts on some templates.
  const topCutoff = (pageHeight||800) * 0.6;
  for(const line of byLine){
    if(line.y < topCutoff) continue;
    const m = lineText(line).match(PO_RE);
    if(m) return m[1];
  }
  for(const line of byLine){
    const m = lineText(line).match(PO_RE);
    if(m) return m[1];
  }
  return null;
}

// Work out the redaction rectangles (in PDF point space, origin bottom-left — the
// same space pdf.js text positions and pdf-lib drawing both use) for a single page.
// Returns an array of {x,y,width,height} rectangles, or [] if nothing recognisable
// was found on that page (e.g. a continuation page with no repeated header).
function computeRedactionRects(items, pageWidth, pageHeight){
  const rects = [];
  const marginX = 18; // keep the outer page border/frame untouched

  // 1) Delivery Date — cover the whole line, label and value both.
  const dd = findItem(items, 'delivery date');
  if(dd){
    const h = itemHeight(dd);
    rects.push({ x: marginX, y: dd.transform[5]-3, width: pageWidth-marginX*2, height: h+7 });
  }

  // 2) Unit Price / Total Price — only the actual VALUES in those two columns
  //    (unit price, total price, "USD" currency tags, subtotal & grand-total
  //    amounts). The "Unit Price"/"Total Price" header text stays visible, and
  //    nothing else that happens to sit in that horizontal band — e.g. the
  //    IMAN code on the model-description line — gets touched, because only
  //    tokens that actually look like a price or currency code are matched.
  const qtyHdr = findItem(items, 'qty');
  const unitPriceHdr = findItem(items, 'unit price');
  const totalPriceHdr = findItem(items, 'total price');
  const poComment = findItem(items, 'po comment');
  if(unitPriceHdr){
    // Anchor the left edge to the Qty column's own right edge (plus a small gap),
    // not an arbitrary offset from the Unit Price header — a flat offset can
    // overshoot into the Qty column when that column is narrow and end up
    // covering Qty's values along with the price columns.
    const qtyRight = qtyHdr ? qtyHdr.transform[4] + (qtyHdr.width||0) : null;
    const upLeft = unitPriceHdr.transform[4];
    const leftX = Math.max(marginX, qtyRight!=null ? Math.min(qtyRight+3, upLeft-2) : upLeft-16);
    const rightX = pageWidth - marginX;
    const topY = unitPriceHdr.transform[5] - 1; // just below the header baseline — header stays visible
    const bottomY = poComment ? (poComment.transform[5] + itemHeight(poComment) + 4) : (pageHeight*0.18);
    if(topY > bottomY){
      const PRICE_RE = /^[\d\s]+\.\d{2,4}$/;         // "8.4300", "472.08", "1 411.74"
      const isPriceLike = s => { const t=(s||'').trim(); return PRICE_RE.test(t) || t.toUpperCase()==='USD'; };
      const priceItems = items.filter(it=>{
        const x=it.transform[4], y=it.transform[5];
        return x>=leftX-2 && x<=rightX && y>=bottomY && y<=topY && isPriceLike(it.str);
      });
      // Large totals are sometimes split across two text runs by the thousands
      // separator (e.g. "1" + " 411.74") — pull in a pure-digit run immediately
      // to the left of a matched value on the same line so the leading digits
      // don't leak out from under the box.
      const extraDigits = items.filter(it=>{
        const t=(it.str||'').trim();
        if(!/^\d+$/.test(t)) return false;
        const x=it.transform[4], y=it.transform[5];
        if(x<leftX-2 || x>rightX || y<bottomY || y>topY) return false;
        return priceItems.some(p=> Math.abs(p.transform[5]-y)<2 && p.transform[4] > x && (p.transform[4]-(x+(it.width||0))) < 8 );
      });
      [...priceItems, ...extraDigits].forEach(it=>{
        const h = itemHeight(it), w = (it.width||30);
        rects.push({ x: it.transform[4]-2, y: it.transform[5]-2, width: w+4, height: h+4 });
      });
    }
  }

  // 3) Everything from "PO Comment" down to the bottom margin (comments, the
  //    "thanks to confirm…" note, order number, contact, department, invoice
  //    address, VAT number, signature lines, fax id) — border kept intact.
  //    The left edge is sized to the actual leftmost text in this band rather
  //    than a fixed guessed margin — some of these lines start further left
  //    than marginX, and a fixed edge left the first letter or two of "PO
  //    Comment", "Please…", "Order Number", "Contact", "Supplier Signature",
  //    "fax id" etc. peeking out past the box.
  if(poComment){
    const bottomMargin = 14;
    const topY = poComment.transform[5] + itemHeight(poComment) + 4;
    if(topY > bottomMargin){
      const bandItems = items.filter(it=>{
        const y = it.transform[5];
        return y >= bottomMargin && y <= topY && (it.str||'').trim().length>0;
      });
      const minX = bandItems.length ? Math.min(...bandItems.map(it=>it.transform[4])) : marginX;
      const leftX = Math.min(marginX, minX-3);
      rects.push({ x: leftX, y: bottomMargin, width: (pageWidth-marginX)-leftX, height: topY-bottomMargin });
    }
  }

  return rects;
}

// Runs the full redact pass on one uploaded PDF's raw bytes.
// onProgress(pageIndexDone, totalPages) is called after each page.
async function redactPoPdfBytes(arrayBuffer, onProgress){
  const bytesForPdfjs = new Uint8Array(arrayBuffer.slice(0));
  const bytesForPdfLib = new Uint8Array(arrayBuffer.slice(0));

  const pdfjsDoc = await pdfjsLib.getDocument({ data: bytesForPdfjs }).promise;
  const pdfLibDoc = await PDFLib.PDFDocument.load(bytesForPdfLib);
  const numPages = pdfjsDoc.numPages;
  const pdfLibPages = pdfLibDoc.getPages();
  const poNumbers = [];

  for(let i=0;i<numPages;i++){
    const pjsPage = await pdfjsDoc.getPage(i+1);
    const viewport = pjsPage.getViewport({ scale: 1 });
    const textContent = await pjsPage.getTextContent();
    const rects = computeRedactionRects(textContent.items, viewport.width, viewport.height);
    poNumbers.push(extractPoNumber(textContent.items, viewport.height));
    const libPage = pdfLibPages[i];
    rects.forEach(r=>{
      libPage.drawRectangle({ x:r.x, y:r.y, width:r.width, height:r.height, color: PDFLib.rgb(1,1,1) });
    });
    if(onProgress) onProgress(i+1, numPages);
  }

  const redactedBytes = await pdfLibDoc.save();
  return { redactedBytes, numPages, poNumbers };
}

// Renders one page of a PDF (given as bytes) to a PNG/JPEG data URL for preview
// or export. dpi controls resolution (96 for on-screen preview, 300 for export).
async function renderPdfPageToDataUrl(bytes, pageNum, dpi, mime){
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;
  const page = await doc.getPage(pageNum);
  const scale = dpi/72;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return { dataUrl: canvas.toDataURL(mime||'image/png', 0.92), canvas, numPages: doc.numPages };
}

// True redaction pass: rebuilds the PDF from a rasterized image of each page
// (same render pipeline as the JPEG/PNG export) so none of the original text
// objects — including the ones still sitting under the white redaction boxes —
// survive. Unlike drawing a rectangle on the vector PDF, this makes the removed
// fields genuinely unrecoverable via copy/paste or any text-extraction tool.
async function flattenPdfToRasterBytes(bytes, numPages, dpi, onProgress){
  const outDoc = await PDFLib.PDFDocument.create();
  const usedDpi = dpi || 300;
  for(let p=1; p<=numPages; p++){
    const { canvas } = await renderPdfPageToDataUrl(bytes, p, usedDpi, 'image/png');
    const pngDataUrl = canvas.toDataURL('image/png');
    const pngBytes = Uint8Array.from(atob(pngDataUrl.split(',')[1]), c=>c.charCodeAt(0));
    const pngImage = await outDoc.embedPng(pngBytes);
    const pageWidthPt = canvas.width * 72 / usedDpi;
    const pageHeightPt = canvas.height * 72 / usedDpi;
    const page = outDoc.addPage([pageWidthPt, pageHeightPt]);
    page.drawImage(pngImage, { x:0, y:0, width: pageWidthPt, height: pageHeightPt });
    if(onProgress) onProgress(p, numPages);
  }
  return await outDoc.save();
}

// Same rasterize-and-rebuild approach as flattenPdfToRasterBytes, but for a
// single page — used when splitting a multi-PO PDF into one file per PO.
async function flattenSinglePageToRasterBytes(bytes, pageNum, dpi){
  const outDoc = await PDFLib.PDFDocument.create();
  const usedDpi = dpi || 300;
  const { canvas } = await renderPdfPageToDataUrl(bytes, pageNum, usedDpi, 'image/png');
  const pngDataUrl = canvas.toDataURL('image/png');
  const pngBytes = Uint8Array.from(atob(pngDataUrl.split(',')[1]), c=>c.charCodeAt(0));
  const pngImage = await outDoc.embedPng(pngBytes);
  const pageWidthPt = canvas.width * 72 / usedDpi;
  const pageHeightPt = canvas.height * 72 / usedDpi;
  const page = outDoc.addPage([pageWidthPt, pageHeightPt]);
  page.drawImage(pngImage, { x:0, y:0, width: pageWidthPt, height: pageHeightPt });
  return await outDoc.save();
}

function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
}

function PODocumentEditorPage(){
  const [files, setFiles] = React.useState([]); // {id,name,size,status,progressDone,progressTotal,numPages,originalBytes,redactedBytes,error}
  const [selectedId, setSelectedId] = React.useState(null);
  const [origPage, setOrigPage] = React.useState(1);
  const [editedPage, setEditedPage] = React.useState(1);
  const [origPreview, setOrigPreview] = React.useState(null);
  const [editedPreview, setEditedPreview] = React.useState(null);
  const [previewLoading, setPreviewLoading] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const processedIds = React.useRef(new Set());

  const selected = files.find(f=>f.id===selectedId) || null;

  function addFiles(fileList){
    const arr = Array.from(fileList).filter(f=>f.type==='application/pdf' || /\.pdf$/i.test(f.name));
    if(arr.length===0) return;
    const entries = arr.map(f=>({
      id: 'pod_'+Date.now()+'_'+Math.random().toString(36).slice(2,8),
      name: f.name, size: f.size, file: f,
      status:'queued', progressDone:0, progressTotal:0, numPages:null,
      originalBytes:null, redactedBytes:null, poNumbers:null, error:null,
    }));
    setFiles(prev=>[...prev, ...entries]);
    if(!selectedId && entries.length) setSelectedId(entries[0].id);
  }

  // Auto-process every queued file — one click (drop/browse) is the whole workflow.
  React.useEffect(()=>{
    files.forEach(f=>{
      if(f.status==='queued' && !processedIds.current.has(f.id)){
        processedIds.current.add(f.id);
        (async()=>{
          setFiles(prev=>prev.map(x=>x.id===f.id?{...x,status:'processing'}:x));
          try{
            const buf = await f.file.arrayBuffer();
            const { redactedBytes, numPages, poNumbers } = await redactPoPdfBytes(buf, (done,total)=>{
              setFiles(prev=>prev.map(x=>x.id===f.id?{...x,progressDone:done,progressTotal:total,numPages:total}:x));
            });
            setFiles(prev=>prev.map(x=>x.id===f.id?{...x,status:'done',originalBytes:buf,redactedBytes,numPages,poNumbers}:x));
          }catch(e){
            console.error('PO PDF redaction failed', e);
            setFiles(prev=>prev.map(x=>x.id===f.id?{...x,status:'error',error:(e&&e.message)||'Failed to process'}:x));
          }
        })();
      }
    });
  },[files]);

  // Load preview images whenever the selected file / page changes.
  React.useEffect(()=>{
    let cancelled = false;
    if(!selected || selected.status!=='done'){ setOrigPreview(null); setEditedPreview(null); return; }
    setPreviewLoading(true);
    (async()=>{
      try{
        const [o,e] = await Promise.all([
          renderPdfPageToDataUrl(selected.originalBytes, origPage, 96, 'image/png'),
          renderPdfPageToDataUrl(selected.redactedBytes, editedPage, 96, 'image/png'),
        ]);
        if(!cancelled){ setOrigPreview(o.dataUrl); setEditedPreview(e.dataUrl); }
      }catch(e){ console.error('preview render failed', e); }
      finally{ if(!cancelled) setPreviewLoading(false); }
    })();
    return ()=>{ cancelled = true; };
  },[selectedId, origPage, editedPage, selected && selected.status]);

  React.useEffect(()=>{ setOrigPage(1); setEditedPage(1); },[selectedId]);

  function removeFile(id){
    setFiles(prev=>prev.filter(f=>f.id!==id));
    processedIds.current.delete(id);
    if(selectedId===id) setSelectedId(null);
  }
  function clearAll(){
    setFiles([]); processedIds.current.clear(); setSelectedId(null);
  }

  async function downloadPdf(f){
    setExporting(true);
    try{
      // Flatten to raster first — the vector redactedBytes still contain the
      // original delivery-date / price / contact text objects underneath the
      // white cover rectangles, fully recoverable via copy/paste or text
      // extraction. Rebuilding the PDF from page images removes that text
      // layer entirely, so this is the version that's actually safe to
      // label "_Internal" and share.
      const flattenedBytes = await flattenPdfToRasterBytes(f.redactedBytes, f.numPages, 300);
      const blob = new Blob([flattenedBytes], { type:'application/pdf' });
      downloadBlob(blob, f.name.replace(/\.pdf$/i,'')+'_Internal.pdf');
    } finally {
      setExporting(false);
    }
  }

  async function downloadRaster(f, mime, ext){
    setExporting(true);
    try{
      const zip = new JSZip();
      const base = f.name.replace(/\.pdf$/i,'');
      for(let p=1;p<=f.numPages;p++){
        const { canvas } = await renderPdfPageToDataUrl(f.redactedBytes, p, 300, mime);
        const blob = await new Promise(res=>canvas.toBlob(res, mime, 0.95));
        const pageLabel = String(p).padStart(2,'0');
        if(f.numPages===1){
          downloadBlob(blob, base+'_Page'+pageLabel+'.'+ext);
        }else{
          zip.file(base+'_Page'+pageLabel+'.'+ext, blob);
        }
      }
      if(f.numPages>1){
        const zipBlob = await zip.generateAsync({ type:'blob' });
        downloadBlob(zipBlob, base+'_'+ext.toUpperCase()+'.zip');
      }
    } finally { setExporting(false); }
  }

  // Splits a multi-PO PDF into one flattened (text-removed) PDF per page/PO,
  // naming each file after the PO number printed at the top of that sheet
  // (e.g. "n° 1130224857" → PO_1130224857_Internal.pdf). Falls back to the
  // page number for any sheet where a PO number couldn't be detected. A
  // single-page file downloads directly; multi-page files are bundled as a zip.
  async function downloadEachPo(f){
    setExporting(true);
    try{
      const zip = new JSZip();
      const base = f.name.replace(/\.pdf$/i,'');
      const usedNames = new Set();
      for(let p=1;p<=f.numPages;p++){
        const bytes = await flattenSinglePageToRasterBytes(f.redactedBytes, p, 300);
        const blob = new Blob([bytes], { type:'application/pdf' });
        const poNum = f.poNumbers && f.poNumbers[p-1];
        const nameBase = poNum ? ('PO_'+poNum) : (base+'_Page'+String(p).padStart(2,'0'));
        let name = nameBase, n = 2;
        while(usedNames.has(name)){ name = nameBase+'_'+n; n++; } // guard against duplicate PO numbers
        usedNames.add(name);
        if(f.numPages===1){
          downloadBlob(blob, name+'_Internal.pdf');
        }else{
          zip.file(name+'_Internal.pdf', blob);
        }
      }
      if(f.numPages>1){
        const zipBlob = await zip.generateAsync({ type:'blob' });
        downloadBlob(zipBlob, base+'_PerPO.zip');
      }
    } finally { setExporting(false); }
  }

  const doneCount = files.filter(f=>f.status==='done').length;
  const totalPages = files.reduce((s,f)=>s+(f.numPages||0),0);

  return (
    <>
      <div className="section">
        <div className="section-head">
          <div className="section-title"><Icon name="upload" size={16}/> Upload Purchase Orders</div>
          {files.length>0 && <button type="button" className="btn" onClick={clearAll}><Icon name="trash" size={13}/> Clear all</button>}
        </div>
        <div className="section-body">
          <label className="drop" onDrop={(e)=>{ e.preventDefault(); addFiles(e.dataTransfer.files); }} onDragOver={(e)=>e.preventDefault()}>
            <div className="drop-title">Drop PO PDFs here, or click to browse</div>
            <div>Supports multiple files at once, and PDFs with hundreds of pages. Redaction starts automatically — no settings to configure.</div>
            <input ref={fileInputRef} type="file" accept="application/pdf" multiple onChange={(e)=>{ addFiles(e.target.files); e.target.value=''; }} />
          </label>

          {files.length>0 && (
            <div className="pod-summary-strip" style={{marginTop:16}}>
              <span><b>{files.length}</b> file{files.length!==1?'s':''}</span>
              <span><b>{doneCount}</b> processed</span>
              <span><b>{totalPages||'—'}</b> total pages</span>
            </div>
          )}

          {files.length>0 && (
            <div className="table-scroll" style={{border:'1px solid var(--border)',borderRadius:'var(--radius-sm)'}}>
              {files.map(f=>(
                <div key={f.id} className={"pod-filerow"+(selectedId===f.id?" active":"")} onClick={()=>setSelectedId(f.id)}>
                  <div className="pod-fileicon"><Icon name="fileText" size={17}/></div>
                  <div className="pod-filemeta">
                    <div className="pod-filename">{f.name}</div>
                    <div className="pod-filesub">
                      <span>{fmtBytes(f.size)}</span>
                      {f.numPages!=null && <span>· {f.numPages} page{f.numPages!==1?'s':''}</span>}
                      <span className={"pod-pill "+f.status}>
                        {f.status==='queued' && 'Queued'}
                        {f.status==='processing' && ('Processing '+f.progressDone+'/'+(f.progressTotal||'…'))}
                        {f.status==='done' && 'Redacted'}
                        {f.status==='error' && 'Failed'}
                      </span>
                    </div>
                    {f.status==='processing' && f.progressTotal>0 && (
                      <div className="pod-bar"><div className="pod-bar-fill" style={{width:(100*f.progressDone/f.progressTotal)+'%'}}/></div>
                    )}
                    {f.status==='error' && <div style={{color:'var(--red)',fontSize:11,marginTop:4}}>{f.error}</div>}
                  </div>
                  <button type="button" className="pod-remove" title="Remove" onClick={(e)=>{ e.stopPropagation(); removeFile(f.id); }}>
                    <Icon name="trash" size={14}/>
                  </button>
                </div>
              ))}
            </div>
          )}
          {files.length===0 && (
            <div className="foot-note" style={{marginTop:12}}>
              Every page automatically has its <b>Delivery Date</b>, <b>Unit Price / Total Price</b> columns, and the
              bottom <b>PO Comment / contact / invoice-address / signature</b> block erased — everything else
              (item, qty, packaging, model, IMAN code, barcode, logo, borders) is left exactly as-is.
            </div>
          )}
        </div>
      </div>

      {selected && selected.status==='done' && (
        <div className="section">
          <div className="section-head">
            <div className="section-title"><Icon name="redact" size={16}/> Preview — {selected.name}</div>
            <div className="pod-fmt-row">
              <button type="button" className="pod-fmt-btn" disabled={exporting} onClick={()=>downloadPdf(selected)}>
                <Icon name="download" size={13}/> PDF
              </button>
              <button type="button" className="pod-fmt-btn" disabled={exporting} onClick={()=>downloadRaster(selected,'image/jpeg','jpg')}>
                <Icon name="download" size={13}/> JPEG
              </button>
              <button type="button" className="pod-fmt-btn" disabled={exporting} onClick={()=>downloadRaster(selected,'image/png','png')}>
                <Icon name="download" size={13}/> PNG
              </button>
              <button type="button" className="pod-fmt-btn" disabled={exporting || selected.numPages<2} title={selected.numPages<2 ? 'Only one PO in this file' : 'Download each PO on its own, named by its PO number'} onClick={()=>downloadEachPo(selected)}>
                <Icon name="download" size={13}/> Each PO (ZIP)
              </button>
            </div>
          </div>
          <div className="section-body">
            <div className="pod-preview-wrap">
              <div className="pod-preview-pane">
                <div className="pod-preview-head">Original</div>
                <div className="pod-preview-body">
                  {previewLoading ? <div className="loading-msg">Rendering…</div> : (origPreview && <img src={origPreview} alt="Original page"/>)}
                </div>
              </div>
              <div className="pod-preview-pane">
                <div className="pod-preview-head">Redacted (internal-share version)</div>
                <div className="pod-preview-body">
                  {previewLoading ? <div className="loading-msg">Rendering…</div> : (editedPreview && <img src={editedPreview} alt="Redacted page"/>)}
                </div>
              </div>
            </div>
            {selected.numPages>1 && (
              <div className="pod-pagenav">
                <button type="button" disabled={origPage<=1} onClick={()=>{ setOrigPage(p=>p-1); setEditedPage(p=>p-1); }}>‹ Prev</button>
                <span>Page {origPage} / {selected.numPages}</span>
                <button type="button" disabled={origPage>=selected.numPages} onClick={()=>{ setOrigPage(p=>p+1); setEditedPage(p=>p+1); }}>Next ›</button>
              </div>
            )}
            <div className="foot-note">
              Redaction covers the source fields with an opaque white block, then the exported <b>PDF</b>, <b>JPEG</b> and
              <b> PNG</b> are all rasterized at 300 DPI and rebuilt with no text layer — so the delivery date, pricing and
              contact fields are not just visually covered, they're removed from the file and cannot be recovered via
              copy/paste or text extraction. The preview above still shows the live vector page for speed; only the
              exported files are flattened.
            </div>
            {selected.numPages>1 && (
              <div className="foot-note" style={{marginTop:6}}>
                <b>Each PO (ZIP)</b> splits a multi-PO file into one PDF per page, reading the PO number automatically
                from the top of each sheet (the "n° ..." line) to name the file — e.g. <span className="mono">PO_1130224857_Internal.pdf</span>.
                A page whose PO number can't be detected falls back to a page-number filename.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------------
// Since this deployment has no shared backend (see README), every visitor's browser
// starts with empty local storage — without a seed list, EVERY new visitor would see
// "Set up the first admin account" instead of a normal login screen. This fixed list
// is provisioned into any browser that has no accounts yet, so everyone sees a plain
// username/password login from their very first visit.
//
// To add, remove, or change a user: edit this list, then redeploy (git commit + push —
// Vercel rebuilds automatically). Changes here do NOT retroactively affect a browser
// that already has accounts stored locally — this only seeds browsers starting fresh.
// The live "Add user" button on the Users page still works day-to-day, but only
// affects the browser that used it, not your teammates' browsers.
const DEFAULT_USERS_SEED = [
  { username:'admin', password:'ChangeThisPassword123', displayName:'Admin', role:'editor', isAdmin:true },
  // { username:'teammate1', password:'AnotherPassword456', displayName:'Teammate One', role:'editor', isAdmin:false },
];

async function seedDefaultUsers(){
  const users = [];
  for(const u of DEFAULT_USERS_SEED){
    const passwordHash = await hashPassword(u.password);
    users.push({
      id: 'u_seed_'+u.username, username:u.username, passwordHash, passwordPlain:u.password,
      displayName:u.displayName, role:u.role||'editor', isAdmin:!!u.isAdmin,
      moduleAccess:u.moduleAccess, createdAt:new Date().toISOString(),
    });
  }
  return users;
}

export default function App(){
  const [page,setPage] = useState('dashboard');
  const [theme,setTheme] = useState('light');
  const [authUsers,setAuthUsers] = useState(null); // null = still loading
  const [currentUser,setCurrentUser] = useState(null);
  const [authLoaded,setAuthLoaded] = useState(false);
  const [showProfileMenu,setShowProfileMenu] = useState(false);
  const [forecastBatches,setForecastBatches] = useState([]);
  const [firmOrderBatches,setFirmOrderBatches] = useState([]);
  const [shipmentBatches,setShipmentBatches] = useState([]);
  const [selectionBatches,setSelectionBatches] = useState([]);
  const [accessoryStyles,setAccessoryStyles] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [parsingForecast,setParsingForecast] = useState(false);
  const [parsingFirm,setParsingFirm] = useState(false);
  const [parsingSelection,setParsingSelection] = useState(false);
  const [parsingShipmentEmbee,setParsingShipmentEmbee] = useState(false);
  const [parsingShipmentGlobe,setParsingShipmentGlobe] = useState(false);
  const [parsingShipmentEmbeeSheet,setParsingShipmentEmbeeSheet] = useState(false);
  const [parsingShipmentGlobeSheet,setParsingShipmentGlobeSheet] = useState(false);
  const [shipmentSheetError,setShipmentSheetError] = useState(null);
  const [invoiceRecords,setInvoiceRecords] = useState([]);
  const [parsingInvoices,setParsingInvoices] = useState(false);
  const [invoiceSkippedNote,setInvoiceSkippedNote] = useState('');
  const [shipmentPlanBatches,setShipmentPlanBatches] = useState([]);
  const [shipmentDetailsBatches,setShipmentDetailsBatches] = useState([]);
  const [parsingShipmentPlan,setParsingShipmentPlan] = useState(false);
  const [parsingShipmentDetails,setParsingShipmentDetails] = useState(false);

  useEffect(()=>{
    (async ()=>{
      let users = (await storeGet('app-users',true)) || [];
      if(users.length===0 && DEFAULT_USERS_SEED.length>0){
        users = await seedDefaultUsers();
        await storeSet('app-users', users, true);
      }
      setAuthUsers(users);
      const session = await storeGet('app-session'); // per-browser, not shared
      if(session && session.userId){
        const u = users.find(x=>x.id===session.userId);
        if(u) setCurrentUser(u);
      }
      setAuthLoaded(true);
    })();
  },[]);

  // If the signed-in user can't (or no longer can) see whatever page is selected —
  // e.g. an admin just revoked their access to it — bounce to the first module they
  // do have access to instead of showing a blocked screen by default.
  useEffect(()=>{
    if(!currentUser) return;
    const allowed = page==='users' ? currentUser.isAdmin : hasModuleAccess(currentUser,page);
    if(!allowed){
      const firstAllowed = MODULE_LIST.find(m=>hasModuleAccess(currentUser,m.key));
      setPage(firstAllowed ? firstAllowed.key : 'dashboard');
    }
  },[currentUser]); // eslint-disable-line

  useEffect(()=>{
    (async ()=>{
      const fc = await storeGet('forecast-batches');
      const fo = await storeGet('firmorder-batches');
      const sh = await storeGet('shipment-batches',true);
      const sel = await storeGet('selection-batches',true);
      const ac = await storeGet('accessory-styles',true);
      const inv = await storeGet('commercial-invoices',true);
      const splan = await storeGet('shipmentplan-batches',true);
      const sdet = await storeGet('shipmentdetails-batches',true);
      const th = await storeGet('ui-theme');
      if(th==='dark' || th==='light') setTheme(th);
      if(fc) setForecastBatches(fc);
      if(fo) setFirmOrderBatches(fo);
      if(sh) setShipmentBatches(sh);
      if(sel) setSelectionBatches(sel);
      setAccessoryStyles(ac && ac.length ? ac : seedAccessoryStyles());
      if(inv) setInvoiceRecords(inv);
      if(splan) setShipmentPlanBatches(splan);
      if(sdet) setShipmentDetailsBatches(sdet);
      setLoaded(true);
    })();
  },[]);

  const handleCreateFirstAdmin = useCallback(async ({username,password,displayName})=>{
    const passwordHash = await hashPassword(password);
    const user = {id:'u_'+Date.now(), username, passwordHash, passwordPlain:password, displayName, role:'editor', isAdmin:true, createdAt:new Date().toISOString()};
    await storeSet('app-users',[user],true);
    setAuthUsers([user]);
    setCurrentUser(user);
    await storeSet('app-session',{userId:user.id});
  },[]);

  const handleLogin = useCallback(async (username,password)=>{
    const hash = await hashPassword(password);
    const u = (authUsers||[]).find(x=>x.username.toLowerCase()===username.toLowerCase() && x.passwordHash===hash);
    if(!u) return false;
    setCurrentUser(u);
    await storeSet('app-session',{userId:u.id});
    return true;
  },[authUsers]);

  const handleLogout = useCallback(async ()=>{
    setCurrentUser(null);
    await storeSet('app-session',null);
  },[]);

  const handleUpdateOwnAvatar = useCallback((patch)=>{
    setAuthUsers(prev=>{
      const next = prev.map(u=>u.id===currentUser.id?{...u,...patch}:u);
      storeSet('app-users',next,true);
      return next;
    });
    setCurrentUser(prev=>({...prev,...patch}));
  },[currentUser]);

  const handleAddUser = useCallback(async ({displayName,username,password,role,isAdmin,moduleAccess})=>{
    const passwordHash = await hashPassword(password);
    const user = {id:'u_'+Date.now(), username, passwordHash, passwordPlain:password, displayName, role, isAdmin, moduleAccess, createdAt:new Date().toISOString()};
    setAuthUsers(prev=>{
      const next=[...prev,user];
      storeSet('app-users',next,true);
      return next;
    });
  },[]);

  // Admin-triggered password reset — re-hashes for login and keeps a plaintext copy so the
  // admin can view/share it later (this app's login is already a soft, client-side-only gate,
  // not real server security — see the login screen's own disclaimer).
  const handleChangePassword = useCallback(async (id,newPassword)=>{
    const passwordHash = await hashPassword(newPassword);
    setAuthUsers(prev=>{
      const next = prev.map(u=>u.id===id?{...u,passwordHash,passwordPlain:newPassword}:u);
      storeSet('app-users',next,true);
      return next;
    });
  },[]);

  const handleRemoveUser = useCallback((id)=>{
    setAuthUsers(prev=>{
      const next = prev.filter(u=>u.id!==id);
      storeSet('app-users',next,true);
      return next;
    });
  },[]);

  const handleChangeUserRole = useCallback((id,patch)=>{
    setAuthUsers(prev=>{
      const next = prev.map(u=>u.id===id?{...u,...patch}:u);
      storeSet('app-users',next,true);
      return next;
    });
  },[]);

  const toggleTheme = useCallback(()=>{
    setTheme(prev=>{
      const next = prev==='dark' ? 'light' : 'dark';
      storeSet('ui-theme', next);
      return next;
    });
  },[]);
  useEffect(()=>{
    document.body.style.background = theme==='dark' ? '#0B1220' : '#FFFFFF';
  },[theme]);

  const handleForecastUpload = useCallback(async (file, weekLabel)=>{
    setParsingForecast(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseForecastWorkbook(wb, file.name);
      batch.weekLabel = weekLabel || 'Unspecified';
      setForecastBatches(prev=>{
        const next=[...prev,batch];
        storeSet('forecast-batches',next);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingForecast(false);
  },[]);

  const handleFirmOrderUpload = useCallback(async (file, weekLabel)=>{
    setParsingFirm(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseFirmOrderWorkbook(wb, file.name);
      batch.weekLabel = weekLabel || 'Unspecified';
      setFirmOrderBatches(prev=>{
        const next=[...prev,batch];
        storeSet('firmorder-batches',next);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingFirm(false);
  },[]);

  // Selection File — planning starts here. Creates a new style, or refreshes an existing one
  // (matched by Style Number), with the fields the Selection File carries.
  const handleSelectionUpload = useCallback(async (file)=>{
    setParsingSelection(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseSelectionWorkbook(wb, file.name);
      setAccessoryStyles(prev=>{
        const byStyleNo = {}; prev.forEach(s=>{ byStyleNo[s.styleNo]=s; });
        batch.rows.forEach(row=>{
          const existing = byStyleNo[row.styleNo];
          if(existing){
            Object.assign(existing, {
              season:row.season||existing.season, buyer:row.buyer||existing.buyer,
              description:row.description||existing.description, color:row.color||existing.color,
              factory:row.factory||existing.factory, country:row.country||existing.country,
              company:row.company||existing.company, supplier:row.supplier||existing.supplier,
              selectionQty: row.selectionQty || existing.selectionQty,
            });
          } else {
            const id = 'st_'+Date.now()+'_'+row.styleNo;
            byStyleNo[row.styleNo] = {
              id, styleNo:row.styleNo, description:row.description, r3Code:'', selectionQty:row.selectionQty,
              ...blankStyleMeta(),
              season:row.season, buyer:row.buyer, color:row.color, factory:row.factory, country:row.country,
              company:row.company, supplier:row.supplier,
              weeks:[{id:'wk_'+Date.now(),label:'WK01',qty:zeroSizes()}], pos:[], fgStock:zeroSizes(), issues:[],
            };
          }
        });
        const next = Object.values(byStyleNo);
        storeSet('accessory-styles',next,true);
        return next;
      });
      setSelectionBatches(prev=>{
        const next=[...prev,{id:batch.id,fileName:batch.fileName,uploadedAt:batch.uploadedAt,rowCount:batch.rowCount}];
        storeSet('selection-batches',next,true);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingSelection(false);
  },[]);

  const handleShipmentUpload = useCallback(async (file,company)=>{
    const setParsing = company==='EMBEE' ? setParsingShipmentEmbee : setParsingShipmentGlobe;
    setParsing(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseShipmentWorkbook(wb, file.name, company);
      setShipmentBatches(prev=>{
        const next=[...prev,batch];
        storeSet('shipment-batches',next,true);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsing(false);
  },[]);

  // Google Sheet import — an alternative to uploading a file. The sheet must be shared as
  // "Anyone with the link can view" (or published to web) since there's no Google sign-in here.
  const handleShipmentSheetImport = useCallback(async (url,company,sheetNameFilter)=>{
    const setParsing = company==='EMBEE' ? setParsingShipmentEmbeeSheet : setParsingShipmentGlobeSheet;
    setParsing(true);
    setShipmentSheetError(null);
    try{
      let batch = null;

      // Attempt 0: the URL is already a direct CSV link (e.g. from File → Share → Publish to web) — use it as-is.
      if(/output=csv|\/pub\b/.test(url)){
        try{
          const res = await fetch(url);
          if(res.ok){
            const csvText = await res.text();
            if(!/^\s*<!doctype html|^\s*<html/i.test(csvText)){
              const wb = XLSX.read(csvText, {type:'string'});
              batch = parseShipmentWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, company);
            }
          }
        }catch(e0){ /* fall through */ }
      }

      // Attempt 1: full workbook (every tab) — works when Google allows the cross-origin request.
      if(!batch){
        try{
          const res = await fetch(googleSheetXlsxExportUrl(url));
          if(res.ok){
            const buf = await res.arrayBuffer();
            const wb = XLSX.read(buf, {type:'array', cellDates:true});
            if(sheetNameFilter){
              const match = wb.SheetNames.filter(nm=>nm.toLowerCase().includes(sheetNameFilter.toLowerCase()));
              if(match.length) wb.SheetNames = match;
            }
            batch = parseShipmentWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, company);
          }
        }catch(e1){ /* fall through to attempt 2 below — usually a CORS block on the export link */ }
      }

      // Attempt 2: Google's Visualization API — reliably allows cross-origin requests, but only
      // returns one tab per call, so a tab name is required if the workbook has more than one.
      if(!batch){
        const gidMatch = url.match(/[?#&]gid=(\d+)/);
        const gvizUrl = googleSheetGvizCsvUrl(url, sheetNameFilter, gidMatch? gidMatch[1] : null);
        if(!gvizUrl) throw new Error('That doesn\'t look like a Google Sheets link.');
        let res;
        try{ res = await fetch(gvizUrl); }
        catch(e2){ throw new Error('Could not reach that sheet at all. This almost always means it isn\'t actually shared as "Anyone with the link can view" yet — open the sheet, click Share, and check the General access setting is not "Restricted".'); }
        if(!res.ok) throw new Error(`Google Sheets returned an error (status ${res.status}). Check the link is shared as "Anyone with the link can view".`);
        const csvText = await res.text();
        if(/^\s*<!doctype html|^\s*<html/i.test(csvText)) throw new Error('That link returned a sign-in page, not data — the sheet needs to be shared as "Anyone with the link can view".');
        const wb = XLSX.read(csvText, {type:'string'});
        batch = parseShipmentWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, company);
      }

      setShipmentBatches(prev=>{
        const next=[...prev,batch];
        storeSet('shipment-batches',next,true);
        return next;
      });
    }catch(e){ setShipmentSheetError({company, message:e.message}); }
    setParsing(false);
  },[]);

  // Shipment Performance — Data Source 1 (Decathlon Weekly Shipment Plan). Reissued weekly;
  // each upload is kept as its own revision, but the matching engine uses the latest per PO.
  const handleShipmentPlanUpload = useCallback(async (file, weekLabel)=>{
    setParsingShipmentPlan(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseShipmentPlanWorkbook(wb, file.name);
      batch.weekLabel = weekLabel || 'Unspecified';
      setShipmentPlanBatches(prev=>{
        const next=[...prev,batch];
        storeSet('shipmentplan-batches',next,true);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingShipmentPlan(false);
  },[]);
  // Shipment Performance — Data Source 2 (Shipment Details). weekDate is the Tuesday the user
  // confirmed in the upload widget; every PO's actuals for that week get summed on top of prior weeks.
  const handleShipmentDetailsUpload = useCallback(async (file, weekDate)=>{
    setParsingShipmentDetails(true);
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const batch = parseShipmentDetailsWorkbook(wb, file.name, weekDate);
      setShipmentDetailsBatches(prev=>{
        const next=[...prev,batch];
        storeSet('shipmentdetails-batches',next,true);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingShipmentDetails(false);
  },[]);
  const handleDeleteShipmentPlanBatch = useCallback((id)=>{
    setShipmentPlanBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('shipmentplan-batches',next,true);
      return next;
    });
  },[]);
  const handleDeleteShipmentDetailsBatch = useCallback((id)=>{
    setShipmentDetailsBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('shipmentdetails-batches',next,true);
      return next;
    });
  },[]);
  const handleDeleteForecastBatch = useCallback((id)=>{
    setForecastBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('forecast-batches',next);
      return next;
    });
  },[]);
  const handleDeleteFirmOrderBatch = useCallback((id)=>{
    setFirmOrderBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('firmorder-batches',next);
      return next;
    });
  },[]);
  const handleDeleteShipmentBatch = useCallback((id)=>{
    setShipmentBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('shipment-batches',next,true);
      return next;
    });
  },[]);
  const handleDeleteSelectionBatch = useCallback((id)=>{
    setSelectionBatches(prev=>{
      const next = prev.filter(b=>b.id!==id);
      storeSet('selection-batches',next,true);
      return next;
    });
  },[]);
  // Shipment Management — Commercial Invoice PDFs. Accepts multiple files at once and
  // silently skips any invoice number already on file, then reports how many were skipped.
  const handleInvoiceUpload = useCallback(async (fileList, weekLabel)=>{
    setParsingInvoices(true);
    setInvoiceSkippedNote('');
    const files = Array.from(fileList);
    let added = 0, skipped = 0, failed = 0;
    try{
      for(const file of files){
        try{
          const parsed = await parseCommercialInvoicePDF(file);
          parsed.weekLabel = weekLabel || 'Unspecified';
          setInvoiceRecords(prev=>{
            const isDup = parsed.invoiceNo && prev.some(r=>r.invoiceNo===parsed.invoiceNo);
            if(isDup){ skipped++; return prev; }
            added++;
            const next = [...prev, parsed];
            storeSet('commercial-invoices', next, true);
            return next;
          });
        }catch(e){ failed++; }
      }
    } finally {
      const notes = [];
      if(added) notes.push(`${added} invoice(s) added`);
      if(skipped) notes.push(`${skipped} duplicate invoice number(s) skipped`);
      if(failed) notes.push(`${failed} file(s) could not be read (scanned/image PDFs need manual entry)`);
      setInvoiceSkippedNote(notes.join(' · '));
      setParsingInvoices(false);
    }
  },[]);
  const handleDeleteInvoice = useCallback((id)=>{
    setInvoiceRecords(prev=>{
      const next = prev.filter(r=>r.id!==id);
      storeSet('commercial-invoices',next,true);
      return next;
    });
  },[]);

  const comparison = useMemo(()=>computeComparison(forecastBatches,firmOrderBatches),[forecastBatches,firmOrderBatches]);

  const pages = {
    dashboard:{title:'Dashboard',sub:'Live merchandising overview'},
    weeklyimport:{title:'Weekly Data Import',sub:'Selection, Forecast, Firm Orders & Shipment Booking'},
    forecast:{title:'Forecast',sub:'Weekly forecast import & revision history'},
    firmorders:{title:'Firm Orders',sub:'Weekly PO import from Decathlon'},
    comparison:{title:'Forecast vs Firm',sub:'Automatic comparison engine'},
    accessories:{title:'Accessories',sub:'Delivery-wise priority planning grid'},
    shipmentmgmt:{title:'Shipment Management',sub:'Commercial invoice tracking & consolidated reporting'},
    shipmentperf:{title:'Shipment Performance',sub:'Decathlon plan vs actual — HOT%, EHD reliability & delay tracking'},
    podocedit:{title:'PO PDF Editor',sub:'Documents — auto-remove delivery date, pricing & contact info from PO PDFs before internal sharing'},
    users:{title:'Users',sub:'Manage who can sign in and what they can edit'},
  };

  if(!loaded || !authLoaded) return null;
  if(!currentUser) return <LoginScreen users={authUsers||[]} onLogin={handleLogin} onCreateFirstAdmin={handleCreateFirstAdmin} />;

  return (
    <div id="app-shell" data-theme={theme} className={currentUser.role==='viewer' ? 'view-only' : ''}>
      <div className="sidebar">
        <div className="brand">
          <div className="brand-logo"><img src={LOGO_DATA_URI} alt="MB&VB Decathlon Team" /></div>
          <div>
            <div className="brand-name">EMBEE</div>
            <div className="brand-sub">Merchandising Planning</div>
          </div>
        </div>
        <div className="nav">
          {Object.entries(pages).filter(([key])=> key==='users' ? currentUser.isAdmin : hasModuleAccess(currentUser,key)).map(([key,p])=>(
            <div key={key} className={"nav-item"+(page===key?" active":"")} onClick={()=>setPage(key)}>
              <Icon name={PAGE_ICONS[key]||'box'} size={17} />
              <span className="nav-label">{p.title}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-foot">EMBEE × Decathlon Vendor Portal</div>
      </div>
      <div className="main">
        <div className="topbar">
          <img className="topbar-watermark" src={LOGO_DATA_URI} alt="" />
          <div>
            <div className="page-title">{pages[page].title}</div>
            <div className="page-sub">{pages[page].sub}</div>
          </div>
          <div className="topbar-actions">
            <div className="user-badge">
              <div onClick={()=>setShowProfileMenu(true)} style={{cursor:'pointer'}} title="Change your profile photo">
                <Avatar user={currentUser} size={24} />
              </div>
              <div>
                <div className="user-badge-name">{currentUser.displayName}{currentUser.role==='viewer' && <span className="viewer-pill">View only</span>}</div>
                <div className="user-badge-role">{currentUser.isAdmin? 'Admin':'Member'} · {currentUser.role}</div>
              </div>
              <button type="button" className="logout-btn" title="Log out" onClick={handleLogout} style={{fontSize:11,fontWeight:700}}>Log out</button>
            </div>
            <button type="button" className="theme-toggle" title={theme==='dark'?'Switch to light mode':'Switch to dark mode'} onClick={toggleTheme}>
              <Icon name={theme==='dark'?'sun':'moon'} size={17} />
            </button>
          </div>
        </div>
        <div className="content">
          {(page==='users' ? !currentUser.isAdmin : !hasModuleAccess(currentUser,page)) ? (
            <div className="empty">You don't have access to this module. Ask your admin to grant it from Users → Module access.</div>
          ) : (
          <>
          <div className="module-banner">
            <div className="module-banner-text">
              <div className="module-banner-eyebrow">EMBEE ERP</div>
              <div className="module-banner-title">{pages[page].title}</div>
              <div className="module-banner-sub">{pages[page].sub}</div>
            </div>
            <div className="module-banner-art"><BannerArt page={page} /></div>
          </div>
          {page!=='dashboard' && (
            <div className="autosave-note" style={{marginBottom:14}}>
              <span className="autosave-dot"></span>
              {hasCloudStorage ? 'Auto-saved · shared across your team' : 'Auto-saved to this browser only — data will not sync to teammates'}
            </div>
          )}
          {page==='dashboard' && <Dashboard forecastBatches={forecastBatches} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches} comparison={comparison} accessoryStyles={accessoryStyles} shipmentPlanBatches={shipmentPlanBatches} shipmentDetailsBatches={shipmentDetailsBatches} />}
          {page==='weeklyimport' && <WeeklyDataImportPage
            selectionBatches={selectionBatches} onSelectionUpload={handleSelectionUpload} parsingSelection={parsingSelection} onDeleteSelection={handleDeleteSelectionBatch}
            forecastBatches={forecastBatches} onForecastUpload={handleForecastUpload} parsingForecast={parsingForecast} onDeleteForecast={handleDeleteForecastBatch}
            firmOrderBatches={firmOrderBatches} onFirmOrderUpload={handleFirmOrderUpload} parsingFirm={parsingFirm} onDeleteFirmOrder={handleDeleteFirmOrderBatch}
            shipmentBatches={shipmentBatches} onShipmentUpload={handleShipmentUpload} parsingShipmentEmbee={parsingShipmentEmbee} parsingShipmentGlobe={parsingShipmentGlobe} onDeleteShipment={handleDeleteShipmentBatch}
            onShipmentSheetImport={handleShipmentSheetImport} parsingShipmentEmbeeSheet={parsingShipmentEmbeeSheet} parsingShipmentGlobeSheet={parsingShipmentGlobeSheet} shipmentSheetError={shipmentSheetError}
          />}
          {page==='forecast' && <ForecastPage batches={forecastBatches} onUpload={handleForecastUpload} parsing={parsingForecast} onDelete={handleDeleteForecastBatch} />}
          {page==='firmorders' && <FirmOrderPage batches={firmOrderBatches} onUpload={handleFirmOrderUpload} parsing={parsingFirm} onDelete={handleDeleteFirmOrderBatch} />}
          {page==='comparison' && <ComparisonPage comparison={comparison} hasData={forecastBatches.length>0} />}
          {page==='accessories' && <AccessoriesPage styles={accessoryStyles} setStyles={setAccessoryStyles} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches} />}
          {page==='shipmentmgmt' && <ShipmentManagementPage invoices={invoiceRecords} onFiles={handleInvoiceUpload} parsing={parsingInvoices} onDelete={handleDeleteInvoice} skippedNote={invoiceSkippedNote} />}
          {page==='shipmentperf' && <ShipmentPerformancePage
            planBatches={shipmentPlanBatches} onPlanUpload={handleShipmentPlanUpload} parsingPlan={parsingShipmentPlan} onDeletePlan={handleDeleteShipmentPlanBatch}
            detailsBatches={shipmentDetailsBatches} onDetailsUpload={handleShipmentDetailsUpload} parsingDetails={parsingShipmentDetails} onDeleteDetails={handleDeleteShipmentDetailsBatch}
          />}
          {page==='podocedit' && <PODocumentEditorPage />}
          {page==='users' && (currentUser.isAdmin
            ? <UserManagementPage users={authUsers||[]} currentUser={currentUser} onAddUser={handleAddUser} onRemoveUser={handleRemoveUser} onChangeRole={handleChangeUserRole} onChangePassword={handleChangePassword} />
            : <div className="empty">Only admins can manage users.</div>)}
          </>
          )}
        </div>
      </div>
      {showProfileMenu && <ProfileMenu user={currentUser} onSave={async(patch)=>{ handleUpdateOwnAvatar(patch); }} onClose={()=>setShowProfileMenu(false)} />}
    </div>
  );
}
