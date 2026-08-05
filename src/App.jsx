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
  dashboard:'dashboard', seasonnames:'filter', weeklyimport:'upload', yarnreq:'box', fabricreq:'layers', accessories:'package',
  forecast:'trending', firmorders:'fileText', comparison:'compare', ordermgmt:'package',
  shipmentmgmt:'ship', shipmentperf:'activity',
  podocedit:'redact', users:'users',
};
// The set of assignable modules an admin can grant/revoke per user (everything in the
// sidebar except the Users page itself, which is tied to the isAdmin flag, not a module).
const MODULE_LIST = [
  {key:'dashboard', label:'Dashboard'},
  {key:'seasonnames', label:'Season Names'},
  {key:'weeklyimport', label:'Selection File'},
  {key:'yarnreq', label:'Yarn Requirement'},
  {key:'fabricreq', label:'Fabric Requirement'},
  {key:'accessories', label:'Accessories Requirement'},
  {key:'forecast', label:'Forecast'},
  {key:'firmorders', label:'Firm Orders'},
  {key:'comparison', label:'Forecast vs Firm'},
  {key:'ordermgmt', label:'Order Management'},
  {key:'shipmentmgmt', label:'Shipment Management'},
  {key:'shipmentperf', label:'Shipment Performance'},
  {key:'podocedit', label:'PO PDF Editor'},
];
// Sidebar grouping — matches the requested nav hierarchy (Overview / Season Preparation /
// Demands / Shipment / Document Editors / Admin). "Admin" is only ever shown to admins,
// handled separately from per-user module access since it's tied to the isAdmin flag.
const NAV_GROUPS = [
  {label:'Overview', keys:['dashboard']},
  {label:'Season Preparation', keys:['seasonnames']},
  {label:'Demands', keys:['forecast','firmorders','comparison','ordermgmt']},
  {label:'Shipment', keys:['shipmentmgmt','shipmentperf']},
  {label:'Document Editors', keys:['podocedit']},
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
// Decathlon changes this file's column layout every season — different header text,
// different column order, sometimes different fields altogether — so column names/positions
// are never hardcoded. Instead, the admin maps each of our fields to whichever column that
// season's file actually has; the mapping is remembered per season and auto-suggested
// (best-effort) the first time based on common header wording.
// Field list follows the current EMBEE Selection File template head-line, left to right:
// Sharing, CPM, RS, SPORT, BRAND, CC, Model Name, Model Code, New/Rec, Selection QTY, SMT Yarn,
// SMT Greige, SMT Dyed, SMT accessories, Total commitment QTY, Implantation CDD Week, Last CDD
// week, MTP/FG (mins), MTP x Qty (mins), FOB, Cost+, Selection TO, TTL Stocks. RS/Style# and
// Model/Model Code/Iman are the same fields under different names across seasons' files.
const SELECTION_MAPPING_FIELDS = [
  {key:'styleNo', label:'RS', guess:['rs','style no','style number','reference','style']},
  {key:'r3Code', label:'Model code', guess:['model code','iman','iman code','r3 code']},
  {key:'description', label:'Model Name', guess:['model name','style description','description']},
  {key:'cc', label:'CC/Iman code/Style', guess:['cc']},
  {key:'brand', label:'Brand', guess:['brand']},
  {key:'buyer', label:'CPM', guess:['cpm','buyer']},
  {key:'company', label:'Sharing', guess:['sharing','company']},
  {key:'department', label:'Sport', guess:['sport','department']},
  {key:'color', label:'Colour', guess:['colour','color']},
  {key:'factory', label:'Factory', guess:['factory']},
  {key:'newOrRec', label:'New / Rec', guess:['new/rec','new rec','new','rec']},
  {key:'selectionQty', label:'Selection QTY', guess:['selection qty','selection quantity','selection qty ']},
  {key:'yarnSmtPct', label:'SMT Yarn', guess:['smt yarn','yarn smt']},
  {key:'fabricGreigeSmtPct', label:'SMT Greige', guess:['smt greige','fabric greige smt','greige smt']},
  {key:'fabricDyingSmtPct', label:'SMT Dyed', guess:['smt dyed','fabric dying smt','dying smt','smt dying']},
  {key:'accSmtPct', label:'SMT accessories', guess:['smt accessories','acc smt','accessories smt']},
  {key:'totalCommitmentQty', label:'Total commitment QTY', guess:['total commitment qty','total commitment','total commitment quantity']},
  {key:'implantationCddWeek', label:'Implantation CDD Week', guess:['implantation cdd week','implantation cdd']},
  {key:'lastCddWeek', label:'Last CDD week', guess:['last cdd week','last cdd']},
  {key:'mtpPerFg', label:'MTP/FG (mins)', guess:['mtp/fg','mtp fg','mtp per fg']},
  {key:'mtpXQty', label:'MTP x Qty (mins)', guess:['mtp x qty','mtp x qty(mins)','mtp x quantity']},
  {key:'fob', label:'FOB', guess:['fob']},
  {key:'costPlus', label:'Cost+', guess:['cost+','cost plus']},
  {key:'selectionTo', label:'Selection TO', guess:['selection to']},
  {key:'ttlStocks', label:'TTL FG+CPT Stocks (after deductions)', guess:['ttl','fg+cpt stocks','stocks after deducting','fg+cpt stock','total stocks']},
];
// Collapses ALL whitespace (including the line-breaks Excel keeps in wrapped header cells,
// e.g. "MTP/ FG\n(mins)") down to single spaces before comparing, and strips the stray quote/
// bullet characters some seasons' files wrap header text in (e.g. """✭""New / ""↷""Rec"") —
// otherwise an exact-match guess silently fails to find a column that's really there, which is
// the main reason a field (most importantly Selection Qty) can come back as "Not in this file"
// and every row imports as 0 even though the file plainly has the data. Also drops periods used
// as abbreviation dots ("M.T.P" -> "mtp") and collapses stray spaces around +, /, & (e.g.
// "Cost +" or "MTP / FG" -> "cost+" / "mtp/fg") — both are common ways a header can be
// *worded* the same but *typed* slightly differently between the template we guessed from and
// the file actually in front of the person.
function normSelHeader(h){
  return String(h==null?'':h)
    .replace(/[""''✭↷*]/g,' ')
    .replace(/\./g,'')
    .replace(/\s*([+/&])\s*/g,'$1')
    .replace(/\s+/g,' ')
    .trim()
    .toLowerCase();
}
// A short guess (3 letters or fewer, e.g. "cc" or "rs") must match a whole word in the header,
// not just appear inside one — otherwise "cc" would match inside "a**cc**essories" and silently
// grab the wrong column. Longer, more specific phrases (e.g. "smt greige") are safe as a plain
// substring check.
function selHeaderContainsGuess(normHeader, normGuess){
  if(!normGuess) return false;
  if(normGuess.length<=3){
    return new RegExp('(^|[^a-z0-9])'+normGuess.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'($|[^a-z0-9])').test(' '+normHeader+' ');
  }
  return normHeader.includes(normGuess);
}
function guessSelectionColumn(field, headers){
  for(const g of field.guess||[]){
    const idx = headers.findIndex(h=>normSelHeader(h)===normSelHeader(g));
    if(idx>=0) return idx;
  }
  for(const g of field.guess||[]){
    const idx = headers.findIndex(h=>selHeaderContainsGuess(normSelHeader(h), normSelHeader(g)));
    if(idx>=0) return idx;
  }
  return -1;
}
// Guesses every field's column together instead of one at a time, so two different fields
// (e.g. CC and SMT Accessories, or Model Code and Model Name) can never both land on the same
// column — once a column is claimed by one field it's removed from the pool for every other
// field. Exact-text matches are resolved first across ALL fields, then word-matched substring
// guesses fill in whatever's left — so a precise match always wins over a fuzzy one, regardless
// of field order. alreadyUsed lets already-confirmed indexes (e.g. a still-valid saved mapping)
// be excluded from the pool too.
function guessAllSelectionColumns(fields, headers, alreadyUsed){
  const used = new Set(alreadyUsed||[]);
  const result = {};
  fields.forEach(f=>{
    for(const g of f.guess||[]){
      const ng = normSelHeader(g);
      const idx = headers.findIndex((h,i)=> !used.has(i) && normSelHeader(h)===ng);
      if(idx>=0){ result[f.key]=idx; used.add(idx); break; }
    }
  });
  fields.forEach(f=>{
    if(result[f.key]!=null) return;
    for(const g of f.guess||[]){
      const ng = normSelHeader(g);
      const idx = headers.findIndex((h,i)=> !used.has(i) && selHeaderContainsGuess(normSelHeader(h), ng));
      if(idx>=0){ result[f.key]=idx; used.add(idx); break; }
    }
    if(result[f.key]==null) result[f.key] = -1;
  });
  return result;
}
// Finds the first row that isn't entirely blank — the header row, whether that grid came
// from an uploaded file or pasted spreadsheet text.
function findSelectionHeaderRowIdx(grid){
  let idx = 0;
  while(idx<grid.length && (!grid[idx] || grid[idx].every(c=>c==null||String(c).trim()===''))) idx++;
  return idx;
}
function selectionHeaderAndPreview(grid){
  const headerRowIdx = findSelectionHeaderRowIdx(grid);
  const headerRow = (grid[headerRowIdx]||[]).map(c=> c==null? '' : String(c).trim());
  const previewRows = grid.slice(headerRowIdx+1, headerRowIdx+4);
  return { headerRow, headerRowIdx, previewRows };
}
// Reads just the header row (and a couple of preview rows) so a mapping screen can be shown
// before committing to a full parse — nothing is imported yet at this point.
async function readSelectionFileHeaders(file){
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf,{type:'array', cellDates:true});
  const ws = wb.Sheets[wb.SheetNames[0]];
  const grid = XLSX.utils.sheet_to_json(ws, {header:1, defval:null, raw:true});
  if(!grid.length) throw new Error('The sheet is empty.');
  return { grid, sourceLabel:file.name, ...selectionHeaderAndPreview(grid) };
}
// Reads the current contents of the live Excel-style grid component (a plain 2D array of
// cell values from Jspreadsheet's getData()) the same way a file/paste source is read —
// trims fully-blank trailing rows/columns left over from the grid's fixed working size,
// then finds the header row exactly as for an uploaded file.
function readSelectionGridData(rawGrid){
  let grid = (rawGrid||[]).map(row=>(row||[]).map(c=> c==null || String(c).trim()==='' ? null : String(c).trim()));
  while(grid.length && grid[grid.length-1].every(c=>c==null)) grid.pop();
  if(!grid.length) throw new Error('The grid is empty — paste your Selection File data in first (click a cell, then Ctrl/Cmd+V).');
  let maxCol = 0;
  grid.forEach(row=>{ for(let c=row.length-1;c>=0;c--){ if(row[c]!=null){ maxCol=Math.max(maxCol,c+1); break; } } });
  grid = grid.map(row=>row.slice(0,maxCol));
  return { grid, sourceLabel:'Pasted from spreadsheet', ...selectionHeaderAndPreview(grid) };
}
// Parses every data row using a confirmed field -> column-index mapping (mapping[key] is a
// column index, or -1/undefined when that field isn't present in this file). If the mapped
// Style Number is blank on a row but an Iman/Model Code is present, that row's identity falls
// back to the Iman/Model Code instead of being dropped — real Decathlon files sometimes leave
// the style-grouping column blank on later rows within the same sheet.
function parseSelectionRowsFromGrid(grid, sourceLabel, headerRowIdx, mapping){
  const get = (row,key)=>{ const idx = mapping[key]; if(idx==null || idx<0) return null; return row[idx]; };
  const rows = [];
  for(let r=headerRowIdx+1; r<grid.length; r++){
    const row = grid[r];
    if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
    const styleNoRaw = get(row,'styleNo');
    const r3CodeRaw = get(row,'r3Code');
    // Model Code (Iman) is what's actually unique per row in real files — one Style Number/RS
    // commonly covers several colorways, each with its own Model Code, all sharing the same RS.
    // Keying on RS first (the old behavior) silently collapsed every colorway sharing an RS into
    // one record, discarding all but the last one's Selection Qty/SMT%/everything — genuine data
    // loss, not just a picker showing "too few" styles. Model Code is the real unique identity;
    // RS is only used as a fallback for the rare row that has no Model Code at all.
    const keyRaw = (r3CodeRaw!=null && String(r3CodeRaw).trim()!=='') ? r3CodeRaw : styleNoRaw;
    if(keyRaw==null || String(keyRaw).trim()==='') continue;
    const str = v => v==null? '' : String(v).trim();
    // Number(v) breaks silently on anything with formatting Excel commonly leaves in place —
    // thousands separators ("1,250"), stray spaces used as separators ("1 250"), or a trailing
    // currency/unit character — turning a real quantity into NaN, which "||0" then quietly
    // turns into 0. This strips that formatting first so a real value always parses as a real
    // number instead of silently becoming zero.
    const num = v => {
      if(v==null) return 0;
      if(typeof v==='number') return isFinite(v) ? v : 0;
      const cleaned = String(v).trim().replace(/[,\s]/g,'').replace(/[^0-9.\-]/g,'');
      if(cleaned==='') return 0;
      const n = parseFloat(cleaned);
      return isFinite(n) ? n : 0;
    };
    rows.push({
      styleNo: str(keyRaw), rsCode: str(styleNoRaw), r3Code: str(r3CodeRaw), description: str(get(row,'description')),
      cc: str(get(row,'cc')), brand: str(get(row,'brand')), buyer: str(get(row,'buyer')),
      color: str(get(row,'color')), factory: str(get(row,'factory')), country: str(get(row,'country')),
      company: str(get(row,'company')), supplier: str(get(row,'supplier')), department: str(get(row,'department')),
      newOrRec: str(get(row,'newOrRec')),
      selectionQty: num(get(row,'selectionQty')),
      yarnSmtPct: num(get(row,'yarnSmtPct')), fabricGreigeSmtPct: num(get(row,'fabricGreigeSmtPct')),
      fabricDyingSmtPct: num(get(row,'fabricDyingSmtPct')), accSmtPct: num(get(row,'accSmtPct')),
      totalCommitmentQty: num(get(row,'totalCommitmentQty')),
      implantationCddWeek: str(get(row,'implantationCddWeek')), lastCddWeek: str(get(row,'lastCddWeek')),
      mtpPerFg: num(get(row,'mtpPerFg')), mtpXQty: num(get(row,'mtpXQty')),
      fob: num(get(row,'fob')), costPlus: num(get(row,'costPlus')),
      selectionTo: str(get(row,'selectionTo')), ttlStocks: num(get(row,'ttlStocks')),
    });
  }
  if(!rows.length) throw new Error('No rows found using this column mapping — check the Style Number / Iman Code and Selection Qty mappings.');
  return { id:'sel_'+Date.now(), type:'SELECTION', fileName:sourceLabel, uploadedAt:new Date().toISOString(), rowCount:rows.length, rows };
}

// ---------- Fabric Requirement — now driven live from the Selection File (see
// computeFabricLine2Calc / FabricRequirementPage below) instead of EMBEE's own upload
// workbook. The old upload-and-parse logic that used to live here has been removed per request.

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
// Same loose-number parser used for the Selection File paste import — strips thousands
// separators, stray spaces, and any other non-numeric formatting Excel commonly leaves in a
// pasted cell (e.g. "1,250" or "1 250") before parsing, so a real value never silently becomes
// 0 the way plain Number(v) would.
function parseNumLoose(v){
  if(v==null) return 0;
  if(typeof v==='number') return isFinite(v)? v : 0;
  const cleaned = String(v).trim().replace(/[,\s]/g,'').replace(/[^0-9.\-]/g,'');
  if(cleaned==='') return 0;
  const nn = parseFloat(cleaned);
  return isFinite(nn) ? nn : 0;
}

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
    brand:'', supplier:'', fabricSupplier:'', accessoriesSupplier:'', company:'', cc:'', rsCode:'',
    smtCommitmentPct:0, fabricCommitmentQty:0, fabricOrderedQty:0,
    accCommitmentPct:0, accCommitmentQty:0,
    yarnSmtPct:0, fabricGreigeSmtPct:0, fabricDyingSmtPct:0, accSmtPct:0,
    prevSeasonFgStock:0, productionCompletedQty:0, shipmentCompletedQty:0,
    newOrRec:'', totalCommitmentQty:0, implantationCddWeek:'', lastCddWeek:'',
    mtpPerFg:0, mtpXQty:0, fob:0, costPlus:0, selectionTo:'', ttlStocks:0,
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
// Builds one Style#/Model/Colour header line + a Sizes-as-rows table + Total row, per group —
// used for Demand Analysis' size-wise export, so the file matches what's on screen exactly
// (unlike the flat one-row-per-group table the "Off — totals only" view exports).
function sizeWiseBlockLines(g, groupByLabel){
  if(g.styles.length===1){
    const s = g.styles[0];
    return [
      `Style# ${s.styleNo}   Model: ${s.r3Code||'—'}   Colour: ${s.color||'—'}`,
      `Selection Qty: ${fmt(s.selectionQty)} Pcs`,
      `Yarn SMT%: ${s.yarnSmtPct}   Fabric Greige SMT%: ${s.fabricGreigeSmtPct}   Fabric Dying SMT%: ${s.fabricDyingSmtPct}   ACC. SMT%: ${s.accSmtPct}`,
      `Total Commitment: ${fmt(Math.round(s.selectionQty * s.fabricDyingSmtPct/100))} Pcs`,
    ];
  }
  return [`${groupByLabel}: ${g.key}   (${g.count} styles: ${g.styles.map(s=>s.styleNo).join(', ')})`];
}
function exportSizeWiseExcel(sizeWiseRows, metricKeys, groupByLabel, filename){
  if(!sizeWiseRows.length){ alert('Nothing to export.'); return; }
  const metricLabels = metricKeys.map(mk=>SIZE_WISE_METRICS.find(m=>m.key===mk).label);
  const aoa = [];
  sizeWiseRows.forEach(g=>{
    sizeWiseBlockLines(g,groupByLabel).forEach(line=>aoa.push([line]));
    aoa.push(['Sizes', ...metricLabels]);
    SIZES.forEach(sz=>{ aoa.push([sz, ...metricKeys.map(mk=>g.metrics[mk][sz])]); });
    aoa.push(['Total', ...metricKeys.map(mk=>sizeSum(g.metrics[mk]))]);
    aoa.push([]);
  });
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Demand Analysis'.slice(0,31));
  XLSX.writeFile(wb, filename);
}
function exportSizeWiseCSV(sizeWiseRows, metricKeys, groupByLabel, filename){
  if(!sizeWiseRows.length){ alert('Nothing to export.'); return; }
  const metricLabels = metricKeys.map(mk=>SIZE_WISE_METRICS.find(m=>m.key===mk).label);
  const esc = v=>{ const s = v==null? '' : String(v); return /[",\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; };
  const lines = [];
  sizeWiseRows.forEach(g=>{
    sizeWiseBlockLines(g,groupByLabel).forEach(line=>lines.push(esc(line)));
    lines.push(['Sizes',...metricLabels].map(esc).join(','));
    SIZES.forEach(sz=>{ lines.push([sz,...metricKeys.map(mk=>g.metrics[mk][sz])].map(esc).join(',')); });
    lines.push(['Total',...metricKeys.map(mk=>sizeSum(g.metrics[mk]))].map(esc).join(','));
    lines.push('');
  });
  const blob = new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function exportSizeWisePDF(sizeWiseRows, metricKeys, groupByLabel, filename){
  if(!sizeWiseRows.length){ alert('Nothing to export.'); return; }
  const metricLabels = metricKeys.map(mk=>SIZE_WISE_METRICS.find(m=>m.key===mk).label);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape'});
  let y = 14;
  doc.setFontSize(13); doc.text('Demand Analysis — Size-wise', 14, y); y += 8;
  sizeWiseRows.forEach(g=>{
    if(y>170){ doc.addPage(); y = 14; }
    doc.setFontSize(9.5);
    const headerLines = sizeWiseBlockLines(g,groupByLabel);
    doc.text(headerLines, 14, y);
    y += headerLines.length * 4.3 + 2;
    const body = SIZES.map(sz=>[sz, ...metricKeys.map(mk=>fmt(g.metrics[mk][sz]))]);
    body.push(['Total', ...metricKeys.map(mk=>fmt(sizeSum(g.metrics[mk])))]);
    doc.autoTable({
      head:[['Sizes', ...metricLabels]], body, startY:y, styles:{fontSize:7}, headStyles:{fillColor:[4,102,175]},
      margin:{left:14,right:14},
    });
    y = doc.lastAutoTable.finalY + 10;
  });
  doc.save(filename);
}
function SizeWiseExportButtons({sizeWiseRows,metricKeys,groupByLabel}){
  if(!sizeWiseRows || !sizeWiseRows.length) return null;
  const stamp = new Date().toISOString().slice(0,10);
  return (
    <div style={{display:'flex',gap:6}}>
      <button className="btn" onClick={()=>exportSizeWiseExcel(sizeWiseRows,metricKeys,groupByLabel,`demand-analysis-sizewise_${stamp}.xlsx`)}>Excel</button>
      <button className="btn" onClick={()=>exportSizeWiseCSV(sizeWiseRows,metricKeys,groupByLabel,`demand-analysis-sizewise_${stamp}.csv`)}>CSV</button>
      <button className="btn" onClick={()=>exportSizeWisePDF(sizeWiseRows,metricKeys,groupByLabel,`demand-analysis-sizewise_${stamp}.pdf`)}>PDF</button>
    </div>
  );
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
function ShipmentDetailsUploadDrop({onFile,parsing,onSheetImport,parsingSheet,sheetError}){
  const inputRef = React.useRef();
  const [weekDate,setWeekDate] = useState(isoDateStr(tuesdayOfWeek(new Date())));
  const [sheetUrl,setSheetUrl] = useState('');
  const [sheetName,setSheetName] = useState('');
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
      <div style={{marginTop:12,paddingTop:12,borderTop:'1px dashed var(--border)'}}>
        <div style={{fontSize:12,color:'var(--ink-soft)',marginBottom:6}}>…or paste a Google Sheet link instead of uploading a file</div>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <input type="text" placeholder="https://docs.google.com/spreadsheets/d/…" value={sheetUrl}
            onChange={e=>setSheetUrl(e.target.value)} style={{flex:1}} disabled={parsingSheet} />
          <button className="btn" disabled={parsingSheet || !sheetUrl.trim()} onClick={()=>onSheetImport(sheetUrl.trim(), sheetName.trim(), new Date(weekDate+'T00:00:00'))}>
            {parsingSheet? 'Importing…' : 'Import'}
          </button>
        </div>
        <input type="text" placeholder="Specific tab name (optional). Leave blank to read every tab."
          value={sheetName} onChange={e=>setSheetName(e.target.value)} disabled={parsingSheet} style={{width:'100%'}} />
        <div style={{fontSize:11,color:'var(--ink-soft)',marginTop:5}}>
          Sheet must be shared as "Anyone with the link can view". Imports against the shipment week selected above.
        </div>
        {sheetError && <div style={{fontSize:12,color:'var(--red)',marginTop:6}}>{sheetError}</div>}
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
function ShipmentPlanRawTable({batch}){
  const rows = batch.rows.slice(0,300);
  return (
    <table>
      <thead><tr><th>Order Number</th><th>Iman/Model</th><th className="num">Ordered</th><th className="num">Shipped</th><th className="num">Delivered</th><th className="num">Remaining</th><th>CHD Week</th><th>CHD Date</th><th>EHD Week</th><th>Supplier</th></tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i}>
            <td className="mono">{r.orderNumber}</td><td className="mono">{r.imanCode||r.model}</td>
            <td className="num">{fmt(r.orderedQty)}</td><td className="num">{fmt(r.shippedQtyPlan)}</td>
            <td className="num">{fmt(r.deliveredQty)}</td><td className="num">{fmt(r.remainingQtyPlan)}</td>
            <td className="mono">{r.chdWeek}</td><td>{r.chdDate? new Date(r.chdDate).toLocaleDateString():'—'}</td>
            <td className="mono">{r.ehdWeek}</td><td>{r.supplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function ShipmentDetailsRawTable({batch}){
  const rows = batch.rows.slice(0,300);
  return (
    <table>
      <thead><tr><th>Style#</th><th>PO#</th><th>Size</th><th className="num">Cartons</th><th className="num">Total PCS</th><th className="num">Price USD/PC</th><th className="num">Total Price USD</th><th>Colour</th></tr></thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i}>
            <td className="mono">{r.styleNo}</td><td className="mono">{r.po}</td><td>{r.size}</td>
            <td className="num">{fmt(r.totalCartons)}</td><td className="num">{fmt(r.totalPcs)}</td>
            <td className="num">{n(r.priceUsdPc).toFixed(2)}</td><td className="num">{n(r.totalPriceUsd).toFixed(2)}</td>
            <td>{r.garmentColor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function ShipmentPerformancePage({planBatches,detailsBatches,onPlanUpload,parsingPlan,onDeletePlan,onDetailsUpload,parsingDetails,onDeleteDetails,onDetailsSheetImport,parsingDetailsSheet,detailsSheetError}){
  const records = useMemo(()=>computeShipmentPerformanceRecords(planBatches,detailsBatches),[planBatches,detailsBatches]);
  const kpis = useMemo(()=>computeShipmentPerformanceKpis(records),[records]);
  const hotKpis = useMemo(()=>computeHotKpis(records),[records]);
  const hasData = planBatches.length>0 || detailsBatches.length>0;
  const [viewPlanId,setViewPlanId] = useState('');
  const [viewDetailsId,setViewDetailsId] = useState('');
  const viewingPlan = planBatches.find(b=>b.id===viewPlanId) || planBatches[planBatches.length-1];
  const viewingDetails = detailsBatches.find(b=>b.id===viewDetailsId) || detailsBatches[detailsBatches.length-1];
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
              <ShipmentDetailsUploadDrop onFile={onDetailsUpload} parsing={parsingDetails}
                onSheetImport={onDetailsSheetImport} parsingSheet={parsingDetailsSheet} sheetError={detailsSheetError} />
              <RevisionRibbon batches={detailsBatches} label="Shipment Details" onDelete={onDeleteDetails} />
            </div>
          </div>
          <div className="foot-note">Matching: Iman Code ↔ STYLE#, Order Number ↔ PO#, Ordered Qty ↔ TTL NO PCS. Every Shipment Plan upload replaces prior figures per PO (latest revision wins); every Shipment Details upload adds that week's actuals on top of prior weeks for the same PO. <b>Use the ✕ on any chip above to delete an upload.</b></div>
        </div>
      </div>

      {(viewingPlan || viewingDetails) && (
        <div className="section">
          <div className="section-head"><div className="section-title">View Uploaded Data</div></div>
          <div className="section-body">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
              {viewingPlan && (
                <div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:8}}>
                    <div className="acc-subhead" style={{margin:0}}>Shipment Plan — {viewingPlan.weekLabel||viewingPlan.fileName}</div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span className="badge-count">{viewingPlan.rowCount} lines</span>
                      {planBatches.length>1 && (
                        <select value={viewingPlan.id} onChange={e=>setViewPlanId(e.target.value)}>
                          {planBatches.slice().reverse().map(b=><option key={b.id} value={b.id}>{b.weekLabel||b.fileName}{b.id===planBatches[planBatches.length-1].id?' (latest)':''}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="table-scroll" style={{maxHeight:420}}><ShipmentPlanRawTable batch={viewingPlan} /></div>
                </div>
              )}
              {viewingDetails && (
                <div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:8}}>
                    <div className="acc-subhead" style={{margin:0}}>Shipment Details — {viewingDetails.weekLabel}</div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span className="badge-count">{viewingDetails.rowCount} lines</span>
                      {detailsBatches.length>1 && (
                        <select value={viewingDetails.id} onChange={e=>setViewDetailsId(e.target.value)}>
                          {detailsBatches.slice().reverse().map(b=><option key={b.id} value={b.id}>{b.weekLabel} — {b.fileName}{b.id===detailsBatches[detailsBatches.length-1].id?' (latest)':''}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="table-scroll" style={{maxHeight:420}}><ShipmentDetailsRawTable batch={viewingDetails} /></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
    return <div className="empty">No accessory styles yet. Upload a <b>Selection File</b> on the Selection File page, or add styles manually on the <b>Accessories</b> page, to populate this overview.</div>;
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

// ---------- Selection File — the starting point of planning, one season at a time. ----------
// Replaces the old "Weekly Data Import" hub. Forecast and Firm Order have their own dedicated
// pages elsewhere in the sidebar with their own uploads, so nothing is lost by not duplicating
// them here. Every upload is tagged with the Season selected below (authoritative for every
// row, regardless of what a "Season" column inside the file might say), plus Upload Date,
// Uploaded By, Version (the nth upload for that season) and optional Remarks.
const SELECTION_SEASONS = ['SS26','AW26','SS27','AW27','SS28','AW28'];

// Step 2 of the upload flow — lets the admin confirm/adjust which column feeds which field,
// pre-filled from a saved mapping for this season (if one exists) or a best-effort auto-guess.
// Replaces the plain <select> for column mapping — with 20+ file columns per field, a native
// dropdown can get cut off by the browser/OS depending on screen size, and scrolling through
// 20+ plain options by eye is slow. This is a custom panel that's always fully visible and
// internally scrollable regardless of browser, plus a search box to filter by typing.
// Generic searchable dropdown — same pattern as MappingColumnDropdown but for {value,label}
// option lists instead of file-column indexes. Used to pick a Selection File style by
// Style/Model Code/Model Name without scrolling a huge native <select>.
function SearchableSelect({options, value, onChange, placeholder, disabled}){
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const wrapRef = React.useRef();
  useEffect(()=>{
    if(!open) return;
    const onDocClick = e=>{ if(wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    return ()=>document.removeEventListener('mousedown', onDocClick);
  },[open]);
  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return options;
    return options.filter(o=>o.label.toLowerCase().includes(q));
  },[options, query]);
  const current = options.find(o=>o.value===value);
  return (
    <div ref={wrapRef} style={{position:'relative',minWidth:220}}>
      <button type="button" className="btn" disabled={disabled} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}
        onClick={()=>{ setOpen(o=>!o); setQuery(''); }}>
        <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',textAlign:'left'}}>{current? current.label : (placeholder||'Select…')}</span>
        <span style={{flex:'none',opacity:.6}}>▾</span>
      </button>
      {open && (
        <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,zIndex:60,background:'#fff',
          border:'1px solid var(--border)',borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,.15)',overflow:'hidden'}}>
          <input autoFocus type="text" placeholder={`Search ${options.length}…`} value={query}
            onChange={e=>setQuery(e.target.value)}
            style={{width:'100%',boxSizing:'border-box',margin:0,padding:'9px 12px',border:'none',borderBottom:'1px solid var(--border-soft)',fontSize:13,outline:'none'}} />
          <div style={{maxHeight:260,overflowY:'auto'}}>
            {!filtered.length && <div style={{padding:'10px 12px',fontSize:12,color:'var(--ink-faint)'}}>No match for "{query}".</div>}
            {filtered.map(o=>(
              <div key={o.value} onMouseDown={e=>e.preventDefault()} onClick={()=>{ onChange(o.value); setOpen(false); setQuery(''); }}
                style={{padding:'8px 12px',fontSize:13,cursor:'pointer',
                  background: o.value===value ? 'var(--primary-soft)' : 'transparent', fontWeight: o.value===value ? 600 : 400}}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// ---- Fabric Requirement v2 — driven live off Selection File, not its own upload ----
// A fabric line stores only what's genuinely fabric-specific (Fabric Part, CPT identity,
// Fabric Sharing, Supplier, consumption, price, packing). Everything that also lives on the
// Selection File (Brand, CC, Model Code, Model Name, Selection Qty, Yarn %, SMT Dyed %, TTL
// FG+CPT Stocks) is joined live from the matching style by styleNo every time this renders —
// never copied in — so editing or re-importing the Selection File is reflected here
// automatically without needing to touch Fabric Requirement at all.
function blankFabricLine2(season, styleNo){
  return {
    id:'fl_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), season:season||'', styleNo:styleNo||'',
    fabricPart:'', otherDesSelection:'', dsm:'',
    cptModelCode:'', cptName:'', cptItemCode:'', cptColor:'',
    fabricSharing:1, supplier:'',
    fabricConsumption:0, extraConsumptionPct:0,
    units:'', cw:'', weight:'', mtsr:'', stampedHangerStatus:'', fobCifExW:'',
    fabricPrice:0, perContainerQty40HQ:0,
  };
}
// Rebuilt per the full spec (replaces the earlier version entirely):
//   Total Commitment       = Selection Qty × SMT Dyed%
//   FG Qty as per Sharing  = Available FG/CPT Stock (i.e. TTL FG+CPT Stocks from Selection File
//                             directly — this is NOT Total Commitment × Fabric Sharing; per the
//                             spec, "Fabric Sharing" is a separate column and is no longer part
//                             of any calculation. Flagging this since it makes the Fabric Sharing
//                             field purely informational right now — tell me if that's wrong.)
//   Total Fabric to be Ordered = (Total Commitment − FG Qty as per Sharing) × Fabric Consumption
//                             × (1 + Extra Consumption %)
//   Total Value             = Total Fabric to be Ordered × Fabric Price
//   Total Containers        = ROUND UP(Total Fabric to be Ordered ÷ Per Container Qty)
// SMT Dyed is still treated as a percentage (÷100) — same open assumption flagged before, still
// unconfirmed against a real row.
function computeFabricLine2Calc(line, style){
  const s = style || {};
  const selectionQty = n(s.selectionQty);
  const yarnPct = n(s.yarnSmtPct);
  const smtDyedPct = n(s.fabricDyingSmtPct);
  const ttlFgCptStocks = n(s.ttlStocks);
  const totalCommitment = selectionQty * (smtDyedPct/100);
  const fgQtyAsPerSharing = ttlFgCptStocks;
  const totalFabricToBeOrdered = (totalCommitment - fgQtyAsPerSharing) * n(line.fabricConsumption) * (1 + n(line.extraConsumptionPct)/100);
  const totalValue = totalFabricToBeOrdered * n(line.fabricPrice);
  const totalContainers = n(line.perContainerQty40HQ)>0 ? Math.ceil(totalFabricToBeOrdered/n(line.perContainerQty40HQ)) : 0;
  return {
    brand: s.brand||'', cc: s.cc||'', modelCode: s.r3Code||'', modelName: s.description||'',
    selectionQty, yarnPct, smtDyedPct, ttlFgCptStocks,
    totalCommitment, fgQtyAsPerSharing, totalFabricToBeOrdered, totalValue, totalContainers,
  };
}
const FABRIC2_STYLE_MISSING = {brand:'',cc:'',modelCode:'',modelName:'(style not found)',selectionQty:0,yarnPct:0,smtDyedPct:0,ttlFgCptStocks:0};

function MappingColumnDropdown({headerRow, value, onChange}){
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const wrapRef = React.useRef();
  useEffect(()=>{
    if(!open) return;
    const onDocClick = e=>{ if(wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    return ()=>document.removeEventListener('mousedown', onDocClick);
  },[open]);
  const allOptions = useMemo(()=> [
    {idx:-1, label:'— Not in this file —'},
    ...headerRow.map((h,idx)=>({idx, label:(h && String(h).trim()) || `(column ${idx+1})`})),
  ],[headerRow]);
  const options = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return allOptions;
    return allOptions.filter(o=>o.label.toLowerCase().includes(q));
  },[allOptions, query]);
  const current = allOptions.find(o=>o.idx===(value==null?-1:value)) || allOptions[0];
  return (
    <div ref={wrapRef} style={{position:'relative',flex:'2 1 200px',minWidth:180}}>
      <button type="button" className="btn" style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}
        onClick={()=>{ setOpen(o=>!o); setQuery(''); }}>
        <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',textAlign:'left'}}>{current.label}</span>
        <span style={{flex:'none',opacity:.6}}>▾</span>
      </button>
      {open && (
        <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,zIndex:60,background:'#fff',
          border:'1px solid var(--border)',borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,.15)',overflow:'hidden'}}>
          <input autoFocus type="text" placeholder={`Search ${headerRow.length} columns…`} value={query}
            onChange={e=>setQuery(e.target.value)}
            style={{width:'100%',boxSizing:'border-box',margin:0,padding:'9px 12px',border:'none',borderBottom:'1px solid var(--border-soft)',fontSize:13,outline:'none'}} />
          <div style={{maxHeight:260,overflowY:'auto'}}>
            {!options.length && <div style={{padding:'10px 12px',fontSize:12,color:'var(--ink-faint)'}}>No column matches "{query}".</div>}
            {options.map(o=>(
              <div key={o.idx} onMouseDown={e=>e.preventDefault()} onClick={()=>{ onChange(o.idx); setOpen(false); setQuery(''); }}
                style={{padding:'8px 12px',fontSize:13,cursor:'pointer',
                  background: o.idx===current.idx ? 'var(--primary-soft)' : 'transparent',
                  fontWeight: o.idx===current.idx ? 600 : 400}}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function SelectionColumnMappingScreen({headerRow, previewRows, initialMapping, onConfirm, onBack}){
  const [mapping,setMapping] = useState(initialMapping);
  useEffect(()=>{ setMapping(initialMapping); },[initialMapping]);
  const setField = (key,val)=> setMapping(prev=>({...prev,[key]: val<0? -1 : Number(val)}));
  const previewFor = (colIdx)=> colIdx==null || colIdx<0 ? '' : (previewRows[0]||[])[colIdx];
  const resetToFreshGuess = ()=>{
    if(!window.confirm("Re-guess every field from scratch, ignoring any mapping saved for this season earlier? You'll still review and confirm before anything imports.")) return;
    setMapping(guessAllSelectionColumns(SELECTION_MAPPING_FIELDS, headerRow, []));
  };
  return (
    <div className="section" style={{marginBottom:16}}>
      <div className="section-head"><div className="section-title">Map your columns</div></div>
      <div className="section-body">
        <div className="foot-note" style={{marginTop:0,marginBottom:14}}>
          This season's file has different column names than last time — that's expected, Decathlon changes the
          layout every season. Match each field below to the right column, or leave it as "Not in this file" if it
          isn't there. This mapping is remembered for this season next time — if a field below looks wrong and you
          suspect it's reusing a bad mapping from before, use <b>Re-guess all columns</b> to start over.
        </div>
        <div style={{marginBottom:12}}>
          <button type="button" className="btn" onClick={resetToFreshGuess}>↻ Re-guess all columns</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {SELECTION_MAPPING_FIELDS.map(f=>(
            <div key={f.key} style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'6px 14px',padding:'10px 4px',borderBottom:'1px solid var(--border-soft)'}}>
              <div style={{flex:'1 1 180px',fontWeight:600,fontSize:13}}>
                {f.label}{(f.key==='styleNo'||f.key==='selectionQty') && <span style={{color:'var(--red)'}}> *</span>}
              </div>
              <MappingColumnDropdown headerRow={headerRow} value={mapping[f.key]} onChange={val=>setField(f.key,val)} />
              <div className="mono" style={{flex:'1 1 140px',color:'var(--ink-faint)',fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                {String(previewFor(mapping[f.key])||'')}
              </div>
            </div>
          ))}
        </div>
        <div className="foot-note" style={{marginTop:10}}><span style={{color:'var(--red)'}}>*</span> Style Number is used to match/create styles — if it's blank on a row but Iman/Model Code is filled in, that row falls back to the Iman/Model Code automatically. Selection Qty is needed for every planning calculation downstream.</div>
        <div style={{display:'flex',gap:8,marginTop:14}}>
          <button type="button" className="btn" onClick={onBack}>← Back</button>
          <button type="button" className="btn primary" onClick={()=>onConfirm(mapping)}>Confirm &amp; Import</button>
        </div>
      </div>
    </div>
  );
}
// A real Excel-like spreadsheet — row numbers, column letters, cell borders, keyboard
// navigation, cell/range selection, a frozen header row, and native copy/paste, delete and
// undo/redo, all provided by Jspreadsheet CE (MIT-licensed, free for commercial use — unlike
// Handsontable, which requires a paid license for any business deployment). Pasting a range
// copied from Excel or Google Sheets (Ctrl/Cmd+V after clicking a cell) is handled natively
// by the library: it distributes the pasted values across cells and grows the sheet if the
// paste is bigger than the current grid, with no custom parsing code needed here.
// The grid used to be a fixed size with column growth turned off, which is exactly what broke
// this: your real template has 23 columns, the grid only had 16, and paste couldn't grow past
// that — so columns 17+ (Last CDD week onward) were silently dropped before mapping ever ran.
// It's not "not in this file", the data never made it into the grid at all. EXCEL_GRID_COLS is
// now sized with real headroom above the current 23-column template, and allowInsertColumn is
// on so a paste wider than that in a future season grows the grid instead of quietly truncating
// again.
const EXCEL_GRID_COLS = 40;
const EXCEL_GRID_ROWS = 200;
function blankExcelGridData(){
  return Array.from({length:EXCEL_GRID_ROWS}, ()=>Array(EXCEL_GRID_COLS).fill(''));
}
function ExcelGridInput({gridRef, cols, rows}){
  const nCols = cols || EXCEL_GRID_COLS;
  const nRows = rows || EXCEL_GRID_ROWS;
  const blankData = ()=> Array.from({length:nRows}, ()=>Array(nCols).fill(''));
  const containerRef = React.useRef();
  const instanceRef = React.useRef(null);

  useEffect(()=>{
    if(!containerRef.current || !window.jspreadsheet) return;
    const instance = window.jspreadsheet(containerRef.current, {
      data: blankData(),
      columns: Array.from({length:nCols}, ()=>({type:'text', width:110})),
      minDimensions: [nCols, nRows],
      tableOverflow: true,
      tableHeight: '420px',
      freezeColumns: 0,
      allowInsertRow: true,
      allowInsertColumn: true,
      allowManualInsertRow: true,
      allowDeleteRow: true,
      allowDeleteColumn: false,
      about: false,
    });
    instanceRef.current = instance;
    gridRef.current = {
      getData: ()=> instanceRef.current ? instanceRef.current.getData() : [],
      clear: ()=> instanceRef.current && instanceRef.current.setData(blankData()),
    };
    return ()=>{
      try{ window.jspreadsheet.destroy(containerRef.current); }catch(e){/* already gone */}
      instanceRef.current = null;
    };
  },[]); // eslint-disable-line

  return <div ref={containerRef} style={{border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',overflow:'hidden'}}></div>;
}
function SelectionFileUploadCard({onImport,parsing,savedMappings,recentSeasons,fixedSeason}){
  const gridApiRef = React.useRef(null);
  const [season,setSeason] = useState(fixedSeason||'');
  const [remarks,setRemarks] = useState('');
  const [step,setStep] = useState('pick'); // 'pick' | 'map'
  const [fileMeta,setFileMeta] = useState(null); // {grid, sourceLabel, headerRow, headerRowIdx, previewRows}
  const [readError,setReadError] = useState('');

  const handleReadGrid = ()=>{
    setReadError('');
    try{
      const raw = gridApiRef.current ? gridApiRef.current.getData() : [];
      const meta = readSelectionGridData(raw);
      setFileMeta(meta);
      setStep('map');
    }catch(e){ setReadError(e.message); }
  };
  const handleClearGrid = ()=>{
    setReadError('');
    if(gridApiRef.current) gridApiRef.current.clear();
  };
  // A saved mapping is only reused for a field if the header text at that column index still
  // matches what it was when the mapping was saved — otherwise this season's layout has
  // shifted and we fall back to a fresh best-effort guess instead of silently mis-mapping.
  // Fields without a valid saved mapping are guessed together (guessAllSelectionColumns), which
  // guarantees no two fields ever get pointed at the same column — e.g. CC can no longer end up
  // sharing a column with SMT Accessories, or Model Code with Model Name.
  const initialMapping = useMemo(()=>{
    if(!fileMeta) return {};
    const saved = savedMappings && savedMappings[season];
    const m = {}; const claimed = [];
    SELECTION_MAPPING_FIELDS.forEach(f=>{
      const savedIdx = saved && saved.indexes ? saved.indexes[f.key] : null;
      const savedHeader = saved && saved.headers ? saved.headers[f.key] : null;
      const stillValid = savedIdx!=null && savedIdx>=0 && savedIdx<fileMeta.headerRow.length
        && normSelHeader(fileMeta.headerRow[savedIdx])===normSelHeader(savedHeader||'');
      if(stillValid){ m[f.key]=savedIdx; claimed.push(savedIdx); }
    });
    const remaining = SELECTION_MAPPING_FIELDS.filter(f=>m[f.key]==null);
    const guessed = guessAllSelectionColumns(remaining, fileMeta.headerRow, claimed);
    remaining.forEach(f=>{ m[f.key]=guessed[f.key]; });
    return m;
  },[fileMeta, savedMappings, season]);

  const confirmImport = (mapping)=>{
    onImport(fileMeta.grid, fileMeta.headerRowIdx, mapping, fileMeta.headerRow, fileMeta.sourceLabel, season, remarks);
    setStep('pick'); setFileMeta(null); setRemarks('');
    if(gridApiRef.current) gridApiRef.current.clear();
  };

  if(step==='map' && fileMeta){
    return (
      <SelectionColumnMappingScreen headerRow={fileMeta.headerRow} previewRows={fileMeta.previewRows}
        initialMapping={initialMapping} onConfirm={confirmImport} onBack={()=>{setStep('pick'); setFileMeta(null);}} />
    );
  }

  const seasonReady = season.trim().length>0;

  return (
    <div className="section" style={{marginBottom:16}}>
      <div className="section-head"><div className="section-title">Upload Selection File</div></div>
      <div className="section-body">
        <div style={{display:'flex',gap:14,marginBottom:14,flexWrap:'wrap',alignItems:'flex-end'}}>
          {!fixedSeason && (
            <div>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--ink-soft)',textTransform:'uppercase',letterSpacing:'.03em',marginBottom:5}}>Season</label>
              <input type="text" list="selection-season-options" value={season} onChange={e=>setSeason(e.target.value)}
                placeholder="e.g. SS26" style={{width:120,fontFamily:'var(--font-mono)',fontWeight:700,textTransform:'uppercase'}} />
              <datalist id="selection-season-options">
                {(recentSeasons||[]).map(s=><option key={s} value={s} />)}
              </datalist>
            </div>
          )}
          <div style={{flex:1,minWidth:220}}>
            <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--ink-soft)',textTransform:'uppercase',letterSpacing:'.03em',marginBottom:5}}>Remarks (optional)</label>
            <input type="text" value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="e.g. Final selection after buyer confirmation" style={{width:'100%'}} />
          </div>
        </div>
        {!seasonReady && <div className="foot-note" style={{marginTop:0,marginBottom:12}}>Type the season this upload belongs to (any code you use — SS26, AW26, SS27…) before uploading or pasting.</div>}

        <div style={{marginBottom:6}}>
          <div className="foot-note" style={{marginTop:0}}>Open Excel or Google Sheets, copy the header row through the last data row (Ctrl/Cmd+C), click the first cell below, then paste (Ctrl/Cmd+V) — it lands exactly as copied.</div>
          <div style={!seasonReady?{opacity:.5,pointerEvents:'none'}:undefined}>
            <ExcelGridInput gridRef={gridApiRef} />
            <div style={{display:'flex',gap:8,marginTop:10}}>
              <button type="button" className="btn" onClick={handleClearGrid}>Clear Data</button>
              <button type="button" className="btn primary" disabled={parsing} onClick={handleReadGrid}>
                {parsing? 'Reading…' : 'Read Selection Data'}
              </button>
            </div>
          </div>
        </div>
        {readError && <div className="foot-note" style={{color:'var(--red)'}}>{readError}</div>}
      </div>
    </div>
  );
}
// ---------- Season Names — defined once per season, feeds Selection File's Season field ----------
function SeasonWorkspaceTabs({season, currentUser,
  selectionBatches, onImport, parsingSelection, onDeleteSelection, onSaveSelectionEdits, onDeleteSelectionRows, savedMappings, seasonNames,
  fabricLines, onUpdateFabricLine, onDeleteFabricLine, onDeleteManyFabricLines, onAddFabricLine, onAddManyFabricLines, onDuplicateFabricLine, onMergeDuplicateStyles,
  accessoryStyles, setAccessoryStyles, firmOrderBatches, shipmentBatches,
}){
  const TABS = [
    {key:'selection', label:'Selection File', moduleKey:'weeklyimport'},
    {key:'yarn', label:'Yarn Requirement', moduleKey:'yarnreq'},
    {key:'fabric', label:'Fabric Requirement', moduleKey:'fabricreq'},
    {key:'accessories', label:'Accessories Requirement', moduleKey:'accessories'},
  ].filter(t=>hasModuleAccess(currentUser, t.moduleKey));
  const [tab,setTab] = useState(TABS[0]? TABS[0].key : '');
  const seasonFabricLines = useMemo(()=>fabricLines.filter(l=>l.season===season),[fabricLines,season]);
  const seasonAccessoryStyles = useMemo(()=>(accessoryStyles||[]).filter(s=>s.season===season),[accessoryStyles,season]);

  return (
    <div>
      <div className="sm-subnav">
        {TABS.map(t=>(
          <div key={t.key} className={"sm-subnav-item"+(tab===t.key?" active":"")} onClick={()=>setTab(t.key)}>{t.label}</div>
        ))}
      </div>
      {tab==='selection' && (
        <SelectionFilePage key={season} selectionBatches={selectionBatches} onImport={onImport} parsingSelection={parsingSelection}
          onDeleteSelection={onDeleteSelection} onSaveSelectionEdits={onSaveSelectionEdits} onDeleteSelectionRows={onDeleteSelectionRows} savedMappings={savedMappings} seasonNames={seasonNames} fixedSeason={season} />
      )}
      {tab==='yarn' && <YarnRequirementPage key={season} />}
      {tab==='fabric' && (
        <FabricRequirementPage key={season} fabricLines={seasonFabricLines}
          onUpdateLine={onUpdateFabricLine} onDeleteLine={onDeleteFabricLine} onDeleteManyLines={onDeleteManyFabricLines} onAddLine={onAddFabricLine}
          onAddManyLines={onAddManyFabricLines} onDuplicateLine={onDuplicateFabricLine} onMergeDuplicateStyles={onMergeDuplicateStyles} season={season} accessoryStyles={seasonAccessoryStyles} />
      )}
      {tab==='accessories' && <AccessoriesRequirementPlaceholder key={season} />}
    </div>
  );
}
function SeasonNamesPage({seasonNames,onAdd,onRemove, currentUser,
  selectionBatches, onImport, parsingSelection, onDeleteSelection, onSaveSelectionEdits, onDeleteSelectionRows, savedMappings,
  fabricLines, onUpdateFabricLine, onDeleteFabricLine, onDeleteManyFabricLines, onAddFabricLine, onAddManyFabricLines, onDuplicateFabricLine, onMergeDuplicateStyles,
  accessoryStyles, setAccessoryStyles, firmOrderBatches, shipmentBatches,
}){
  const [name,setName] = useState('');
  const [activeSeason,setActiveSeason] = useState(null);
  const submit = ()=>{ onAdd(name); setName(''); };

  if(activeSeason){
    return (
      <div>
        <div className="btn" style={{marginBottom:14,display:'inline-flex',alignItems:'center',gap:6}} onClick={()=>setActiveSeason(null)}>← Back to Seasons</div>
        <div className="section-title" style={{fontSize:19,marginBottom:4}}>{activeSeason}</div>
        <div className="page-sub" style={{marginBottom:16}}>Everything below is scoped to {activeSeason} only.</div>
        <SeasonWorkspaceTabs season={activeSeason} currentUser={currentUser}
          selectionBatches={selectionBatches} onImport={onImport} parsingSelection={parsingSelection} onDeleteSelection={onDeleteSelection} onSaveSelectionEdits={onSaveSelectionEdits} onDeleteSelectionRows={onDeleteSelectionRows} savedMappings={savedMappings} seasonNames={seasonNames}
          fabricLines={fabricLines} onUpdateFabricLine={onUpdateFabricLine} onDeleteFabricLine={onDeleteFabricLine} onDeleteManyFabricLines={onDeleteManyFabricLines} onAddFabricLine={onAddFabricLine} onAddManyFabricLines={onAddManyFabricLines} onDuplicateFabricLine={onDuplicateFabricLine} onMergeDuplicateStyles={onMergeDuplicateStyles}
          accessoryStyles={accessoryStyles} setAccessoryStyles={setAccessoryStyles} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches} />
      </div>
    );
  }

  return (
    <div>
      <div className="section" style={{marginBottom:16,background:'var(--primary-soft)',border:'1px solid var(--primary)'}}>
        <div className="section-body" style={{fontSize:13,color:'var(--ink-soft)'}}>
          Add a season, then click it to open its own Selection File, Yarn Requirement, Fabric Requirement and
          Accessories Requirement — each season keeps its data separate from every other season.
        </div>
      </div>
      <div className="section">
        <div className="section-head"><div className="section-title">Add a season</div></div>
        <div className="section-body">
          <div style={{display:'flex',gap:8}}>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. SS27"
              style={{width:160,fontFamily:'var(--font-mono)',fontWeight:700,textTransform:'uppercase'}}
              onKeyDown={e=>{ if(e.key==='Enter') submit(); }} />
            <button className="btn primary" onClick={submit}><Icon name="plus" size={14}/> Add</button>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-head"><div className="section-title">Seasons <span className="badge-count">{seasonNames.length}</span></div></div>
        <div className="section-body">
          {!seasonNames.length ? <div className="empty">No seasons added yet.</div> : (
            <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {seasonNames.map(s=>(
                <div key={s} className="section" style={{margin:0,padding:'14px 18px',cursor:'pointer',display:'flex',alignItems:'center',gap:10}}
                  onClick={()=>setActiveSeason(s)}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                  <span className="mono" style={{fontWeight:700,fontSize:15}}>{s}</span>
                  <button className="icon-btn" style={{padding:2}} title="Remove"
                    onClick={e=>{ e.stopPropagation(); if(window.confirm(`Remove season ${s}? This only removes it from the list — any data already tagged with this season stays untouched.`)) onRemove(s); }}>✕</button>
                  <span style={{color:'var(--primary)',marginLeft:4}}>→</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// ---------- Yarn Requirement — placeholder until built (next module after Fabric Requirement) ----------
function YarnRequirementPage(){
  return (
    <div className="section">
      <div className="section-body">
        <div className="empty">
          <b>Yarn Requirement isn't built yet.</b><br/>
          This will follow the same pattern as Fabric Requirement — consumption, wastage/extra %, requirement
          calculated from Selection Qty, ordering and a simple extract report — once we get to it.
        </div>
      </div>
    </div>
  );
}
// ---------- Accessories Requirement (season-scoped) — left blank on purpose ----------
// The old Accessories page (delivery-wise priority grid + PO tracking) now lives at
// Demands → Order Management, unfiltered by season. This tab will become the real
// "Accessories Requirement" — weekly, buyer-commitment-driven, size-wise quantities per the
// original spec — once Yarn and Fabric Requirement are both finished.
function AccessoriesRequirementPlaceholder(){
  return (
    <div className="section">
      <div className="section-body">
        <div className="empty">
          <b>Accessories Requirement isn't built yet.</b><br/>
          This will be the weekly, buyer-commitment-driven size-wise quantity planner — separate from Order
          Management (Demands), which now holds the existing delivery-wise priority grid and PO tracking.
          Coming once Yarn and Fabric Requirement are finished.
        </div>
      </div>
    </div>
  );
}

// Single source of truth for every field that comes off a Selection File row — used for the
// on-screen Viewing table AND Excel/PDF export, so the two can never drift apart again (the
// on-screen table used to be a hand-picked 15-column subset while export had the full 25,
// which is exactly why SMT Yarn/Greige/Dyed/Accessories, MTP, Selection TO and TTL Stocks were
// invisible on screen even though they were captured and exportable all along).
const SELECTION_RAW_TABLE_COLUMNS = [
  {key:'company', label:'Sharing'}, {key:'buyer', label:'CPM'}, {key:'rsCode', label:'RS', mono:true},
  {key:'department', label:'Sport'}, {key:'brand', label:'Brand'}, {key:'cc', label:'CC/Iman code/Style'},
  {key:'description', label:'Model Name'}, {key:'r3Code', label:'Model code', mono:true},
  {key:'newOrRec', label:'New/Rec'}, {key:'selectionQty', label:'Selection Qty', num:true},
  {key:'totalCommitmentQty', label:'Total Commitment Qty', num:true},
  {key:'yarnSmtPct', label:'SMT Yarn', num:true}, {key:'fabricGreigeSmtPct', label:'SMT Greige', num:true},
  {key:'fabricDyingSmtPct', label:'SMT Dyed', num:true}, {key:'accSmtPct', label:'SMT Accessories', num:true},
  {key:'implantationCddWeek', label:'Implantation CDD'}, {key:'lastCddWeek', label:'Last CDD'},
  {key:'mtpPerFg', label:'MTP/FG (mins)', num:true}, {key:'mtpXQty', label:'MTP x Qty (mins)', num:true},
  {key:'fob', label:'FOB', num:true}, {key:'costPlus', label:'Cost+', num:true},
  {key:'selectionTo', label:'Selection TO'}, {key:'ttlStocks', label:'TTL FG+CPT Stocks', num:true},
  {key:'color', label:'Colour'}, {key:'factory', label:'Factory'},
];
// Small in-place editor for one cell. Typing only updates its own local text; the edit is
// only reported upward (into the page's draft, not yet saved anywhere) on blur/Enter, and only
// if the value actually changed — so clicking into a cell and clicking back out isn't treated
// as an edit. Nothing here ever touches storage; only the page's explicit Save button does.
function SelectionEditableCell({value, numeric, onDraft}){
  const [val,setVal] = useState(value==null?'':value);
  useEffect(()=>{ setVal(value==null?'':value); },[value]);
  const commit = ()=>{ if(String(val)!==String(value==null?'':value)) onDraft(val); };
  return (
    <input type={numeric?'number':'text'} value={val} onChange={e=>setVal(e.target.value)}
      onBlur={commit} onKeyDown={e=>{ if(e.key==='Enter') e.target.blur(); }}
      style={{width:'100%',minWidth:numeric?70:100,border:'1px solid var(--border)',borderRadius:4,
        padding:'3px 6px',fontSize:12,fontFamily:numeric?'var(--font-mono)':undefined}} />
  );
}
function SelectionFileRawTable({rows, editing, draft, onDraftChange, selectedIdx, onToggleSelect, onToggleSelectAll}){
  const shown = rows.slice(0,500);
  const allShownSelected = shown.length>0 && shown.every(r=>selectedIdx.has(r._idx));
  return (
    <table>
      <thead><tr>
        <th style={{textAlign:'center'}}><input type="checkbox" checked={allShownSelected} onChange={()=>onToggleSelectAll(shown.map(r=>r._idx))} title="Select all rows shown" /></th>
        {SELECTION_RAW_TABLE_COLUMNS.map(c=><th key={c.key} className={c.num?'num':undefined}>{c.label}</th>)}
      </tr></thead>
      <tbody>
        {shown.map((r,i)=>{
          const rowDraft = draft && draft[r._idx];
          return (
          <tr key={r._idx!=null?r._idx:i} style={selectedIdx.has(r._idx)?{background:'var(--primary-soft)'}:undefined}>
            <td style={{textAlign:'center'}}><input type="checkbox" checked={selectedIdx.has(r._idx)} onChange={()=>onToggleSelect(r._idx)} /></td>
            {SELECTION_RAW_TABLE_COLUMNS.map(c=>{
              const pending = rowDraft && Object.prototype.hasOwnProperty.call(rowDraft,c.key);
              const shownValue = pending ? rowDraft[c.key] : r[c.key];
              return (
                <td key={c.key} className={c.num?'num':(c.mono?'mono':undefined)} style={pending?{background:'#fff8e1'}:undefined}>
                  {editing && onDraftChange ? (
                    <SelectionEditableCell value={shownValue} numeric={!!c.num}
                      onDraft={val=>onDraftChange(r._idx, c.key, val)} />
                  ) : (c.num ? fmt(shownValue) : (shownValue||''))}
                </td>
              );
            })}
          </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="totals-row">
          <td style={{fontWeight:700, borderTop:'2px solid var(--border)'}}></td>
          {SELECTION_RAW_TABLE_COLUMNS.map((c,i)=>(
            <td key={c.key} className={c.num?'num':undefined} style={{fontWeight:700, borderTop:'2px solid var(--border)'}}>
              {i===0 ? `TOTAL (${rows.length} rows)` : (c.num ? fmt(rows.reduce((sum,r)=>sum+(Number(r[c.key])||0),0)) : '')}
            </td>
          ))}
        </tr>
        {rows.length>shown.length && (
          <tr><td colSpan={SELECTION_RAW_TABLE_COLUMNS.length+1} className="foot-note">Showing first {shown.length} of {rows.length} matching rows on screen — export and totals include all {rows.length}.</td></tr>
        )}
      </tfoot>
    </table>
  );
}
// Column set + row shaping shared by the Selection File on-screen table, Excel export and PDF
// export, so all three always show exactly the same fields in the same order.
// width is in mm — used directly as the PDF column's cellWidth, and roughly converted for the
// Excel column width so a freshly exported file is already readable without the person having
// to manually widen every column first. num:true right-aligns and applies thousands separators
// (1250 -> "1,250") so figures read the way they would in a real finance/production doc — text
// fields (including ones that already carry their own formatting, like a $-prefixed value from
// the source file) are left exactly as imported.
const SELECTION_EXPORT_COLUMNS = [
  {key:'company', label:'Sharing', width:16}, {key:'buyer', label:'CPM', width:14},
  {key:'rsCode', label:'RS', width:18}, {key:'department', label:'Sport', width:20},
  {key:'brand', label:'Brand', width:20}, {key:'cc', label:'CC/Iman code/Style', width:26},
  {key:'description', label:'Model Name', width:42}, {key:'r3Code', label:'Model code', width:16},
  {key:'newOrRec', label:'New/Rec', width:12}, {key:'selectionQty', label:'Selection QTY', width:20, num:true},
  {key:'totalCommitmentQty', label:'Total Commitment QTY', width:22, num:true},
  {key:'yarnSmtPct', label:'SMT Yarn', width:14, num:true}, {key:'fabricGreigeSmtPct', label:'SMT Greige', width:16, num:true},
  {key:'fabricDyingSmtPct', label:'SMT Dyed', width:14, num:true}, {key:'accSmtPct', label:'SMT Accessories', width:18, num:true},
  {key:'implantationCddWeek', label:'Implantation CDD Week', width:20}, {key:'lastCddWeek', label:'Last CDD Week', width:18},
  {key:'mtpPerFg', label:'MTP/FG (mins)', width:16, num:true}, {key:'mtpXQty', label:'MTP x Qty (mins)', width:16, num:true},
  {key:'fob', label:'FOB', width:14, num:true}, {key:'costPlus', label:'Cost+', width:14, num:true},
  {key:'selectionTo', label:'Selection TO', width:16}, {key:'ttlStocks', label:'TTL FG+CPT Stocks', width:22, num:true},
  {key:'color', label:'Colour', width:16}, {key:'factory', label:'Factory', width:16},
];
function fmtExportNum(v){
  if(v==null || v==='') return '';
  const n = Number(v);
  if(!isFinite(n)) return String(v);
  return n.toLocaleString('en-US', {maximumFractionDigits: Number.isInteger(n)?0:2});
}
// A "Total" row summed across every numeric column (Selection Qty, Total Commitment Qty,
// SMT %s, MTP, FOB, Cost+, TTL Stocks) for whatever rows are currently being exported/shown —
// if a filter is applied, this totals the filtered set, not the whole file, since that's what's
// actually on screen. Non-numeric columns just show a "Total" label in the first one.
function selectionColumnTotals(rows){
  const totals = {};
  SELECTION_EXPORT_COLUMNS.forEach(c=>{
    if(!c.num) return;
    totals[c.key] = rows.reduce((sum,r)=> sum + (Number(r[c.key])||0), 0);
  });
  return totals;
}
function selectionRowsToExportObjects(rows){
  const objs = rows.map(r=>{
    const o = {};
    SELECTION_EXPORT_COLUMNS.forEach(c=>{
      const v = r[c.key];
      o[c.label] = c.num ? (v==null||v===''? '' : Number(v)) : (v==null? '' : v);
    });
    return o;
  });
  const totals = selectionColumnTotals(rows);
  const totalRow = {};
  SELECTION_EXPORT_COLUMNS.forEach((c,i)=>{ totalRow[c.label] = i===0? 'TOTAL' : (c.num? totals[c.key] : ''); });
  objs.push(totalRow);
  return objs;
}
function exportSelectionExcel(batch, rows){
  if(!rows.length){ alert('Nothing to export — adjust or clear the filter.'); return; }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(selectionRowsToExportObjects(rows));
  ws['!cols'] = SELECTION_EXPORT_COLUMNS.map(c=>({wch: Math.round(c.width*0.85)}));
  ws['!freeze'] = {xSplit:0, ySplit:1}; // keep the header row visible while scrolling
  XLSX.utils.book_append_sheet(wb, ws, 'Selection File');
  XLSX.writeFile(wb, `EMBEE_Selection_${batch.season||''}_v${batch.version||1}.xlsx`);
}
function exportSelectionPDF(batch, rows){
  if(!rows.length){ alert('Nothing to export — adjust or clear the filter.'); return; }
  const { jsPDF } = window.jspdf;
  // A custom, extra-wide landscape page (not standard A3) so 25 columns each get a real,
  // readable width instead of being squeezed until the header text wraps letter-by-letter.
  const doc = new jsPDF({orientation:'landscape', unit:'mm', format:[520,300]});
  const margin = 10;
  doc.setFontSize(16); doc.setFont(undefined,'bold'); doc.text('EMBEE', margin, 14);
  doc.setFontSize(11); doc.setFont(undefined,'normal');
  doc.text(`Selection File — ${batch.season||''} v${batch.version||1}`, margin, 21);
  doc.setFontSize(9); doc.setTextColor(120);
  doc.text(`${batch.fileName||''}   |   Generated ${new Date().toLocaleString()}   |   ${rows.length} rows`, margin, 27);
  doc.setTextColor(0);
  const columnStyles = {};
  SELECTION_EXPORT_COLUMNS.forEach((c,i)=>{ columnStyles[i] = {cellWidth:c.width, halign:c.num?'right':'left'}; });
  const totals = selectionColumnTotals(rows);
  doc.autoTable({
    head:[SELECTION_EXPORT_COLUMNS.map(c=>c.label)],
    body: rows.map(r=>SELECTION_EXPORT_COLUMNS.map(c=>{
      const v = r[c.key];
      if(v==null || v==='') return '—';
      return c.num ? fmtExportNum(v) : String(v);
    })),
    foot:[SELECTION_EXPORT_COLUMNS.map((c,i)=> i===0? 'TOTAL' : (c.num? fmtExportNum(totals[c.key]) : ''))],
    footStyles:{fillColor:[224,232,240], textColor:[20,20,20], fontStyle:'bold', halign:'right'},
    startY:32, margin:{left:margin, right:margin}, tableWidth:'wrap',
    styles:{fontSize:7.5, cellPadding:2.2, overflow:'linebreak', valign:'middle'},
    headStyles:{fillColor:[4,102,175], textColor:255, fontSize:7.5, fontStyle:'bold', halign:'center'},
    alternateRowStyles:{fillColor:[247,249,252]}, theme:'grid', columnStyles,
  });
  doc.save(`EMBEE_Selection_${batch.season||''}_v${batch.version||1}.pdf`);
}
// Free-text search (Style/Model/Model Code/Description/CC/Brand/Factory/Colour) plus dropdown
// filters built from whatever values actually appear in this batch — so the filter list always
// matches the season's real data instead of a hardcoded set.
const SELECTION_SORT_FIELDS = [
  {key:'description', label:'Model Name'}, {key:'r3Code', label:'Model Code'}, {key:'rsCode', label:'RS'},
  {key:'cc', label:'CC'}, {key:'brand', label:'Brand'}, {key:'company', label:'Sharing'},
  {key:'selectionQty', label:'Selection Qty', num:true}, {key:'totalCommitmentQty', label:'Total Commitment Qty', num:true},
];
function SelectionFileFilterBar({rows, filters, setFilters, sortBy, setSortBy, sortDir, setSortDir}){
  const options = (key)=> Array.from(new Set(rows.map(r=>r[key]).filter(v=>v!=null && v!==''))).sort();
  const setF = (key,val)=> setFilters(prev=>({...prev,[key]:val}));
  const clearAll = ()=> setFilters({q:'',cc:'',brand:'',factory:'',company:'',department:'',newOrRec:''});
  const active = Object.values(filters).some(v=>v);
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',marginBottom:12}}>
      <input type="text" placeholder="Search style, model, code, description…" value={filters.q}
        onChange={e=>setF('q',e.target.value)} style={{flex:'1 1 240px',minWidth:200}} />
      <select value={filters.cc} onChange={e=>setF('cc',e.target.value)} style={{minWidth:110}}>
        <option value="">All CC</option>{options('cc').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      <select value={filters.brand} onChange={e=>setF('brand',e.target.value)} style={{minWidth:120}}>
        <option value="">All Brands</option>{options('brand').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      <select value={filters.department} onChange={e=>setF('department',e.target.value)} style={{minWidth:120}}>
        <option value="">All Sports</option>{options('department').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      <select value={filters.factory} onChange={e=>setF('factory',e.target.value)} style={{minWidth:130}}>
        <option value="">All Factories</option>{options('factory').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      <select value={filters.company} onChange={e=>setF('company',e.target.value)} style={{minWidth:130}}>
        <option value="">All Sharing</option>{options('company').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      <select value={filters.newOrRec} onChange={e=>setF('newOrRec',e.target.value)} style={{minWidth:110}}>
        <option value="">New/Rec — All</option>{options('newOrRec').map(v=><option key={v} value={v}>{v}</option>)}
      </select>
      {active && <button type="button" className="btn" onClick={clearAll}>Clear filters</button>}
      <span style={{flex:1}}></span>
      <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{minWidth:150}}>
        <option value="">Sort: Original order</option>
        {SELECTION_SORT_FIELDS.map(f=><option key={f.key} value={f.key}>Sort by {f.label}</option>)}
      </select>
      {sortBy && (
        <button type="button" className="btn" onClick={()=>setSortDir(d=>d==='asc'?'desc':'asc')} style={{minWidth:90}}>
          {sortDir==='asc' ? 'A → Z' : 'Z → A'}
        </button>
      )}
    </div>
  );
}
function SelectionFilePage({selectionBatches,onImport,parsingSelection,onDeleteSelection,onSaveSelectionEdits,onDeleteSelectionRows,savedMappings,seasonNames,fixedSeason}){
  const recentSeasons = useMemo(()=>{
    const set = new Set([...(seasonNames||[]), ...selectionBatches.map(b=>b.season).filter(Boolean)]);
    return Array.from(set);
  },[selectionBatches, seasonNames]);
  const visibleBatches = fixedSeason ? selectionBatches.filter(b=>b.season===fixedSeason) : selectionBatches;
  const [viewId,setViewId] = useState('');
  const viewing = visibleBatches.find(b=>b.id===viewId) || null;
  const [filters,setFilters] = useState({q:'',cc:'',brand:'',factory:'',company:'',department:'',newOrRec:''});
  const [sortBy,setSortBy] = useState('');
  const [sortDir,setSortDir] = useState('asc'); // 'asc' (A→Z) | 'desc' (Z→A)
  const filteredRows = useMemo(()=>{
    if(!viewing) return [];
    const q = filters.q.trim().toLowerCase();
    const rows = (viewing.rows||[]).map((r,idx)=>({...r,_idx:idx})).filter(r=>{
      if(filters.cc && r.cc!==filters.cc) return false;
      if(filters.brand && r.brand!==filters.brand) return false;
      if(filters.factory && r.factory!==filters.factory) return false;
      if(filters.company && r.company!==filters.company) return false;
      if(filters.department && r.department!==filters.department) return false;
      if(filters.newOrRec && r.newOrRec!==filters.newOrRec) return false;
      if(q){
        const hay = [r.styleNo,r.r3Code,r.description,r.cc,r.brand,r.factory,r.color].join(' ').toLowerCase();
        if(!hay.includes(q)) return false;
      }
      return true;
    });
    if(!sortBy) return rows;
    const field = SELECTION_SORT_FIELDS.find(f=>f.key===sortBy);
    const sorted = [...rows].sort((a,b)=>{
      if(field && field.num){
        const cmp = (Number(a[sortBy])||0) - (Number(b[sortBy])||0);
        return sortDir==='asc' ? cmp : -cmp;
      }
      const cmp = String(a[sortBy]||'').localeCompare(String(b[sortBy]||''), undefined, {numeric:true, sensitivity:'base'});
      return sortDir==='asc' ? cmp : -cmp;
    });
    return sorted;
  },[viewing, filters, sortBy, sortDir]);
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState({}); // {rowIndex: {field:rawValue,...}} — local only until Save is clicked
  const draftCount = Object.keys(draft).length;
  const setCell = (rowIdx,field,val)=> setDraft(prev=>({...prev, [rowIdx]:{...(prev[rowIdx]||{}), [field]:val}}));
  const toggleEditing = ()=>{
    if(editing && draftCount && !window.confirm(`Discard ${draftCount} unsaved row edit(s)?`)) return;
    setEditing(e=>!e); setDraft({});
  };
  const saveEdits = ()=>{
    if(!draftCount || !viewing) return;
    const edits = Object.entries(draft).map(([rowIndex,changes])=>({rowIndex:Number(rowIndex),changes}));
    onSaveSelectionEdits && onSaveSelectionEdits(viewing.id, edits);
    setDraft({});
  };
  const [selectedIdx,setSelectedIdx] = useState(()=>new Set());
  const toggleSelectRow = (idx)=> setSelectedIdx(prev=>{ const next=new Set(prev); next.has(idx)? next.delete(idx) : next.add(idx); return next; });
  const toggleSelectAllRows = (idxList)=> setSelectedIdx(prev=>{
    const allSelected = idxList.every(i=>prev.has(i));
    const next = new Set(prev);
    idxList.forEach(i=> allSelected? next.delete(i) : next.add(i));
    return next;
  });
  const deleteSelectedRows = ()=>{
    if(!selectedIdx.size || !viewing) return;
    if(!window.confirm(`Delete ${selectedIdx.size} selected row(s) from this upload? This only removes them from this Selection File view — it does not remove or change any linked Fabric/Yarn/Accessories Requirement data. This can't be undone.`)) return;
    onDeleteSelectionRows && onDeleteSelectionRows(viewing.id, [...selectedIdx]);
    setSelectedIdx(new Set());
  };
  return (
    <div>
      {!fixedSeason && (
        <div className="section" style={{marginBottom:16,background:'var(--primary-soft)',border:'1px solid var(--primary)'}}>
          <div className="section-body" style={{fontSize:13,color:'var(--ink-soft)'}}>
            Planning starts from the <b>Selection File</b> — pick the season, upload, then confirm which column maps to
            which field (Decathlon changes the layout every season, so nothing is hardcoded). Everything downstream
            (Accessories, Production, Dashboard, Reports) reads from what's uploaded here.
          </div>
        </div>
      )}

      <SelectionFileUploadCard onImport={onImport} parsing={parsingSelection} savedMappings={savedMappings} recentSeasons={recentSeasons} fixedSeason={fixedSeason} />

      <div className="section">
        <div className="section-head"><div className="section-title">Upload History <span className="badge-count">{visibleBatches.length}</span></div></div>
        <div className="section-body table-scroll">
          {!visibleBatches.length ? <div className="empty">No Selection File uploaded yet.</div> : (
            <table>
              <thead><tr><th>Season</th><th>Version</th><th>File</th><th className="num">Rows</th><th>Uploaded</th><th>Uploaded By</th><th>Remarks</th><th></th></tr></thead>
              <tbody>
                {visibleBatches.slice().reverse().map(b=>(
                  <tr key={b.id}>
                    <td><span className="badge-count">{b.season||'—'}</span></td>
                    <td className="mono">v{b.version||1}</td>
                    <td>{b.fileName}</td>
                    <td className="num">{fmt(b.rowCount)}</td>
                    <td>{new Date(b.uploadedAt).toLocaleString()}</td>
                    <td>{b.uploadedBy||'—'}</td>
                    <td>{b.remarks||'—'}</td>
                    <td style={{display:'flex',gap:6}}>
                      {b.rows && b.rows.length>0 && (
                        <button type="button" className="btn" style={{padding:'4px 9px',fontSize:11}}
                          onClick={()=>{ const next = viewId===b.id?'':b.id; setViewId(next); setFilters({q:'',cc:'',brand:'',factory:'',company:'',department:'',newOrRec:''}); setEditing(false); setDraft({}); setSelectedIdx(new Set()); setSortBy(''); setSortDir('asc'); }}>
                          {viewId===b.id? 'Hide':'View'}
                        </button>
                      )}
                      <button className="icon-btn" title="Remove"
                        onClick={()=>{ if(window.confirm(`Remove this ${b.season||''} upload (${b.fileName})? This can't be undone.`)) onDeleteSelection(b.id); }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {viewing && (
        <div className="section">
          <div className="section-head">
            <div className="section-title">Viewing — {viewing.season} v{viewing.version||1} ({viewing.fileName})</div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span className="badge-count">{filteredRows.length} of {viewing.rowCount} rows</span>
              {editing && <span className="badge-count" style={{background:draftCount?'var(--amber-soft, #fff3cd)':undefined}}>{draftCount} unsaved</span>}
              <button type="button" className={"btn"+(editing?" primary":"")} onClick={toggleEditing}>{editing? '✕ Exit Edit Mode':'✎ Edit'}</button>
              {editing && <button type="button" className="btn primary" disabled={!draftCount} onClick={saveEdits}>💾 Save Changes</button>}
              {editing && draftCount>0 && <button type="button" className="btn" onClick={()=>{ if(window.confirm(`Discard ${draftCount} unsaved row edit(s)?`)) setDraft({}); }}>Discard</button>}
              {selectedIdx.size>0 && <button type="button" className="btn" onClick={()=>setSelectedIdx(new Set())}>Clear selection ({selectedIdx.size})</button>}
              {selectedIdx.size>0 && <button type="button" className="btn" style={{color:'var(--red)',borderColor:'var(--red)'}} onClick={deleteSelectedRows}>🗑 Delete Selected ({selectedIdx.size})</button>}
              <button type="button" className="btn" onClick={()=>exportSelectionExcel(viewing, filteredRows)}>⬇ Export Excel</button>
              <button type="button" className="btn" onClick={()=>exportSelectionPDF(viewing, filteredRows)}>⬇ Export PDF</button>
            </div>
          </div>
          <div className="section-body table-scroll">
            {editing && <div className="foot-note" style={{marginTop:0,marginBottom:10}}>Click any cell to correct it, then click <b>Save Changes</b> — nothing is saved until you click it. Saved edits update this style everywhere downstream (Fabric/Yarn/Accessories Requirement, Demands, Dashboard).</div>}
            <SelectionFileFilterBar rows={viewing.rows||[]} filters={filters} setFilters={setFilters}
              sortBy={sortBy} setSortBy={setSortBy} sortDir={sortDir} setSortDir={setSortDir} />
            {!filteredRows.length ? <div className="empty">No rows match this filter.</div> : (
              <SelectionFileRawTable rows={filteredRows} editing={editing} draft={draft} onDraftChange={setCell}
                selectedIdx={selectedIdx} onToggleSelect={toggleSelectRow} onToggleSelectAll={toggleSelectAllRows} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// ---------- Fabric Requirement page ----------
function TextCell({value, onChange, editable=true, mono, width}){
  if(!editable){
    return <div className="cell-computed" style={{fontFamily:mono?'var(--font-mono)':undefined}}>{value||''}</div>;
  }
  return <input type="text" className="cell-input" style={{width, fontFamily:mono?'var(--font-mono)':undefined}}
    value={value||''} onChange={e=>onChange(e.target.value)} />;
}
function FabricLineRow({line, style, styleOptions, editing, rowDraft, onDraftChange, onDelete, onDuplicate, selected, onToggleSelect}){
  const merged = {...line, ...rowDraft};
  const calc = computeFabricLine2Calc(merged, style || FABRIC2_STYLE_MISSING);
  const cell = (key, numeric) => editing ? (
    <SelectionEditableCell value={merged[key]} numeric={!!numeric} onDraft={v=>onDraftChange(line.id, key, v)} />
  ) : (numeric ? fmt(merged[key]) : (merged[key]||''));
  return (
    <tr style={selected?{background:'var(--primary-soft)'}:undefined}>
      <td style={{textAlign:'center'}}><input type="checkbox" checked={!!selected} onChange={()=>onToggleSelect(line.id)} /></td>
      <td className="stickycol lbl">
        {editing ? (
          <SearchableSelect options={styleOptions} value={merged.styleNo} onChange={v=>onDraftChange(line.id,'styleNo',v)} placeholder="Pick style…" />
        ) : style ? (
          <span className="mono">{calc.modelCode || merged.styleNo}</span>
        ) : (
          <span style={{color:'var(--red)'}}>(no style linked)</span>
        )}
        <button type="button" className="icon-btn" title="Remove line" style={{marginTop:5}}
          onClick={()=>{ if(window.confirm('Remove this fabric line? This can\'t be undone.')) onDelete(line.id); }}>✕ Remove</button>
        <button type="button" className="icon-btn" title="Duplicate this line" style={{marginTop:5, marginLeft:6}}
          onClick={()=>onDuplicate(line)}>⧉ Duplicate</button>
      </td>
      <td className="lbl">{calc.brand}</td>
      <td>{cell('fabricPart')}</td>
      <td className="lbl mono">{calc.cc}</td>
      <td className="lbl mono">{calc.modelCode}</td>
      <td className="lbl">{calc.modelName}</td>
      <td className="num">{fmt(calc.selectionQty)}</td>
      <td className="num">{fmt(calc.yarnPct)}</td>
      <td className="num" style={style && calc.smtDyedPct===0 ? {color:'var(--red)'} : undefined}
        title={style && calc.smtDyedPct===0 ? 'SMT Dyed is 0 in Selection File for this style — that\'s why Total Commitment is 0. Fix it in Selection File → Viewing → Edit, not here.' : undefined}>
        {fmt(calc.smtDyedPct)}{style && calc.smtDyedPct===0 ? ' ⚠' : ''}
      </td>
      <td>{cell('otherDesSelection')}</td>
      <td className="num" style={{fontWeight:700}}
        title={style && calc.smtDyedPct===0 ? 'Selection Qty × SMT Dyed% — SMT Dyed is 0 in Selection File, so this is correctly 0 until that\'s filled in.' : undefined}>
        {fmt(calc.totalCommitment.toFixed(2))}
      </td>
      <td>{cell('dsm')}</td>
      <td>{cell('cptModelCode')}</td>
      <td>{cell('cptName')}</td>
      <td>{cell('cptItemCode')}</td>
      <td>{cell('cptColor')}</td>
      <td>{cell('fabricSharing', true)}</td>
      <td>{cell('supplier')}</td>
      <td className="num" style={{fontWeight:700}}>{fmt(calc.fgQtyAsPerSharing.toFixed(2))}</td>
      <td>{cell('fabricConsumption', true)}</td>
      <td>{cell('extraConsumptionPct', true)}</td>
      <td className="num" style={{fontWeight:700, color:balColor(calc.totalFabricToBeOrdered)}}>{fmt(calc.totalFabricToBeOrdered.toFixed(2))}</td>
      <td>{cell('units')}</td>
      <td>{cell('cw')}</td>
      <td>{cell('weight')}</td>
      <td>{cell('mtsr')}</td>
      <td>{cell('stampedHangerStatus')}</td>
      <td>{cell('fobCifExW')}</td>
      <td>{cell('fabricPrice', true)}</td>
      <td className="num" style={{fontWeight:700}}>{fmt(calc.totalValue.toFixed(2))}</td>
      <td>{cell('perContainerQty40HQ', true)}</td>
      <td className="num" style={{fontWeight:700}}>{fmt(calc.totalContainers.toFixed(2))}</td>
    </tr>
  );
}
// Same design as the Selection File exports: explicit per-column widths so the PDF never
// squeezes into letter-by-letter wrapping, right-aligned thousands-separated numbers, a bold
// TOTAL row, and a properly column-sized Excel sheet.
// Full column set matching your Fabric Requirement template, left to right. Non-numeric join
// fields (brand/cc/modelCode/modelName) and the qty/pct join fields (selectionQty/yarnPct/
// smtDyedPct) come from the live-joined style, not from the stored line.
const FABRIC_EXPORT_COLUMNS = [
  {key:'brand', label:'Brand', width:16}, {key:'fabricPart', label:'Fabric Part', width:18},
  {key:'cc', label:'CC', width:14}, {key:'modelCode', label:'Model Code', width:16},
  {key:'modelName', label:'Model Name', width:32}, {key:'selectionQty', label:'Selection QTY', width:16, num:true},
  {key:'yarnPct', label:'Yarn', width:12, num:true}, {key:'smtDyedPct', label:'SMT Dyed', width:14, num:true},
  {key:'otherDesSelection', label:'Other Destination Selection', width:20}, {key:'totalCommitment', label:'Total Commitment', width:16, num:true},
  {key:'dsm', label:'DSM', width:14}, {key:'cptModelCode', label:'CPT Model Code', width:16},
  {key:'cptName', label:'CPT Name', width:20}, {key:'cptItemCode', label:'CPT Item Code', width:16},
  {key:'cptColor', label:'CPT Color', width:16}, {key:'fabricSharing', label:'Fabric Sharing', width:14, num:true},
  {key:'supplier', label:'Supplier', width:18}, {key:'fgQtyAsPerSharing', label:'FG Qty as per Sharing', width:16, num:true},
  {key:'fabricConsumption', label:'Fabric Consumption', width:16, num:true}, {key:'extraConsumptionPct', label:'Extra Consumption %', width:14, num:true},
  {key:'totalFabricToBeOrdered', label:'Total Fabric to be Ordered', width:18, num:true}, {key:'units', label:'Units', width:10},
  {key:'cw', label:'CW', width:10}, {key:'weight', label:'Weight', width:12},
  {key:'mtsr', label:'MTSR', width:10}, {key:'stampedHangerStatus', label:'Stamped Hanger Status', width:16},
  {key:'fobCifExW', label:'FOB / CIF / Ex-W', width:14}, {key:'fabricPrice', label:'Fabric price', width:14, num:true},
  {key:'totalValue', label:'Total Value', width:18, num:true}, {key:'perContainerQty40HQ', label:'Per container Qty (40" HQ)', width:16, num:true},
  {key:'totalContainers', label:'Total Containers', width:14, num:true},
];
function fabricStyleMap(accessoryStyles){
  const map = {}; (accessoryStyles||[]).forEach(s=>{ if(s.styleNo) map[s.styleNo]=s; }); return map;
}
function fabricRowsForExport(lines, accessoryStyles){
  const map = fabricStyleMap(accessoryStyles);
  return lines.map(l=>{ const c = computeFabricLine2Calc(l, map[l.styleNo]||FABRIC2_STYLE_MISSING); return {...l, ...c}; });
}
function fabricColumnTotals(rows){
  const totals = {};
  FABRIC_EXPORT_COLUMNS.forEach(c=>{ if(c.num) totals[c.key] = rows.reduce((s,r)=>s+(Number(r[c.key])||0),0); });
  return totals;
}
function exportFabricExcel(season, lines, accessoryStyles){
  if(!lines.length){ alert('Nothing to export — adjust or clear the filter.'); return; }
  const rows = fabricRowsForExport(lines, accessoryStyles);
  const totals = fabricColumnTotals(rows);
  const objs = rows.map(r=>{
    const o = {};
    FABRIC_EXPORT_COLUMNS.forEach(c=>{ const v=r[c.key]; o[c.label] = c.num ? (v==null?0:Number(v)) : (v==null?'':v); });
    return o;
  });
  const totalRow = {}; FABRIC_EXPORT_COLUMNS.forEach((c,i)=>{ totalRow[c.label] = i===0? 'TOTAL' : (c.num? totals[c.key] : ''); });
  objs.push(totalRow);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(objs);
  ws['!cols'] = FABRIC_EXPORT_COLUMNS.map(c=>({wch: Math.round(c.width*0.85)}));
  ws['!freeze'] = {xSplit:0, ySplit:1};
  XLSX.utils.book_append_sheet(wb, ws, 'Fabric Requirement');
  XLSX.writeFile(wb, `EMBEE_FabricRequirement_${season||''}.xlsx`);
}
function exportFabricPDF(season, lines, accessoryStyles){
  if(!lines.length){ alert('Nothing to export — adjust or clear the filter.'); return; }
  const rows = fabricRowsForExport(lines, accessoryStyles);
  const totals = fabricColumnTotals(rows);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape', unit:'mm', format:[560,300]});
  const margin = 10;
  doc.setFontSize(16); doc.setFont(undefined,'bold'); doc.text('EMBEE', margin, 14);
  doc.setFontSize(11); doc.setFont(undefined,'normal');
  doc.text(`Fabric Requirement — ${season||''}`, margin, 21);
  doc.setFontSize(9); doc.setTextColor(120);
  doc.text(`Generated ${new Date().toLocaleString()}   |   ${rows.length} lines`, margin, 27);
  doc.setTextColor(0);
  const columnStyles = {};
  FABRIC_EXPORT_COLUMNS.forEach((c,i)=>{ columnStyles[i] = {cellWidth:c.width, halign:c.num?'right':'left'}; });
  doc.autoTable({
    head:[FABRIC_EXPORT_COLUMNS.map(c=>c.label)],
    body: rows.map(r=>FABRIC_EXPORT_COLUMNS.map(c=>{
      const v = r[c.key];
      if(v==null || v==='') return '—';
      return c.num ? fmtExportNum(Number(v).toFixed(2)) : String(v);
    })),
    foot:[FABRIC_EXPORT_COLUMNS.map((c,i)=> i===0? 'TOTAL' : (c.num? fmtExportNum(totals[c.key].toFixed(2)) : ''))],
    footStyles:{fillColor:[224,232,240], textColor:[20,20,20], fontStyle:'bold', halign:'right'},
    startY:32, margin:{left:margin, right:margin}, tableWidth:'wrap',
    styles:{fontSize:7, cellPadding:2, overflow:'linebreak', valign:'middle'},
    headStyles:{fillColor:[4,102,175], textColor:255, fontSize:7, fontStyle:'bold', halign:'center'},
    alternateRowStyles:{fillColor:[247,249,252]}, theme:'grid', columnStyles,
  });
  doc.save(`EMBEE_FabricRequirement_${season||''}.pdf`);
}
// Bulk paste grid: only the fabric-specific columns are actually taken from the paste — Brand,
// CC, Model Name, Selection Qty, Yarn, SMT Dyed and every computed column are intentionally
// IGNORED even if present in the pasted data, because those must come live from the Selection
// File, never from a frozen paste. Each pasted row is matched to a style by Model Code (falling
// back to CC) against the season's Selection File styles.
const FABRIC_SORT_FIELDS = [
  {key:'modelName', label:'Model Name', from:'calc'}, {key:'modelCode', label:'Model Code', from:'calc'},
  {key:'brand', label:'Brand', from:'calc'}, {key:'cc', label:'CC', from:'calc'},
  {key:'supplier', label:'Supplier', from:'line'}, {key:'fabricPart', label:'Fabric Part', from:'line'},
  {key:'selectionQty', label:'Selection Qty', from:'calc', num:true},
  {key:'totalCommitment', label:'Total Commitment', from:'calc', num:true},
  {key:'totalFabricToBeOrdered', label:'Total Fabric to be Ordered', from:'calc', num:true},
  {key:'totalValue', label:'Total Value', from:'calc', num:true},
];
const FABRIC_PASTE_COLUMNS = [
  {key:'modelCodeMatch', label:'Model Code (to match style)'}, {key:'fabricPart', label:'Fabric Part'},
  {key:'otherDesSelection', label:'Other Destination Selection'}, {key:'dsm', label:'DSM'},
  {key:'cptModelCode', label:'CPT Model Code'}, {key:'cptName', label:'CPT Name'},
  {key:'cptItemCode', label:'CPT Item Code'}, {key:'cptColor', label:'CPT Color'},
  {key:'fabricSharing', label:'Fabric Sharing', num:true}, {key:'supplier', label:'Supplier'},
  {key:'fabricConsumption', label:'Fabric Consumption', num:true}, {key:'extraConsumptionPct', label:'Extra Consumption %', num:true},
  {key:'units', label:'Units'}, {key:'cw', label:'CW'}, {key:'weight', label:'Weight'}, {key:'mtsr', label:'MTSR'},
  {key:'stampedHangerStatus', label:'Stamped Hanger Status'}, {key:'fobCifExW', label:'FOB / CIF / Ex-W'},
  {key:'fabricPrice', label:'Fabric price', num:true}, {key:'perContainerQty40HQ', label:'Per container Qty (40" HQ)', num:true},
];
function parseFabricPasteGrid(grid, season, accessoryStyles){
  const headerRowIdx = findSelectionHeaderRowIdx(grid);
  const map = fabricStyleMap(accessoryStyles);
  const byR3Code = {}; Object.values(map).forEach(s=>{ if(s.r3Code) byR3Code[String(s.r3Code).trim()]=s; });
  const rows = []; let skipped = 0;
  for(let r=headerRowIdx+1; r<grid.length; r++){
    const row = grid[r];
    if(!row || row.every(c=>c==null||String(c).trim()==='')) continue;
    const matchKey = row[0]==null? '' : String(row[0]).trim();
    if(!matchKey) continue;
    const style = map[matchKey] || byR3Code[matchKey];
    if(!style){ skipped++; continue; }
    const str = v=>v==null?'':String(v).trim();
    const line = blankFabricLine2(season, style.styleNo);
    FABRIC_PASTE_COLUMNS.forEach((c,i)=>{
      if(c.key==='modelCodeMatch') return;
      const v = row[i];
      line[c.key] = c.num ? parseNumLoose(v) : str(v);
    });
    if(!line.fabricSharing) line.fabricSharing = 1;
    rows.push(line);
  }
  return {rows, skipped};
}
function exportFabricSummaryExcel(season, summaryBy, summaryRows){
  if(!summaryRows.length){ alert('Nothing to export — no rows match this filter.'); return; }
  const keyLabel = summaryBy==='modelCode'?'Style / Model':summaryBy==='supplier'?'Supplier':'Brand';
  exportToExcel([{name:'Fabric '+keyLabel+' Summary', rows: summaryRows.map(r=>({
    [keyLabel]: r.key, Lines: r.lines, 'To be Ordered': Number(r.toBeOrdered.toFixed(2)),
    'Total Value': Number(r.totalValue.toFixed(2)), 'Total Containers': r.totalContainers,
  }))}], `EMBEE_FabricRequirement_${keyLabel.replace(/[\s/]/g,'')}Summary_${season||''}.xlsx`);
}
function exportFabricSummaryPDF(season, summaryBy, summaryRows){
  if(!summaryRows.length){ alert('Nothing to export — no rows match this filter.'); return; }
  const keyLabel = summaryBy==='modelCode'?'Style / Model':summaryBy==='supplier'?'Supplier':'Brand';
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape', unit:'mm', format:'a4'});
  doc.setFontSize(16); doc.setFont(undefined,'bold'); doc.text('EMBEE', 14, 14);
  doc.setFontSize(11); doc.setFont(undefined,'normal');
  doc.text(`Fabric Requirement — ${keyLabel} Summary — ${season||''}`, 14, 21);
  doc.setFontSize(9); doc.setTextColor(120);
  doc.text(`Generated ${new Date().toLocaleString()}   |   ${summaryRows.length} ${keyLabel.toLowerCase()}(s)`, 14, 27);
  doc.setTextColor(0);
  const totalRow = summaryRows.reduce((t,r)=>({lines:t.lines+r.lines, toBeOrdered:t.toBeOrdered+r.toBeOrdered, totalValue:t.totalValue+r.totalValue, totalContainers:t.totalContainers+r.totalContainers}), {lines:0,toBeOrdered:0,totalValue:0,totalContainers:0});
  doc.autoTable({
    head:[[keyLabel,'Lines','To be Ordered','Total Value','Total Containers']],
    body: summaryRows.map(r=>[r.key, fmtExportNum(r.lines), fmtExportNum(r.toBeOrdered.toFixed(2)), fmtExportNum(r.totalValue.toFixed(2)), fmtExportNum(r.totalContainers)]),
    foot:[['TOTAL', fmtExportNum(totalRow.lines), fmtExportNum(totalRow.toBeOrdered.toFixed(2)), fmtExportNum(totalRow.totalValue.toFixed(2)), fmtExportNum(totalRow.totalContainers)]],
    footStyles:{fillColor:[224,232,240], textColor:[20,20,20], fontStyle:'bold', halign:'right'},
    startY:32, styles:{fontSize:9, cellPadding:3}, columnStyles:{1:{halign:'right'},2:{halign:'right'},3:{halign:'right'},4:{halign:'right'}},
    headStyles:{fillColor:[4,102,175], textColor:255, fontStyle:'bold'}, alternateRowStyles:{fillColor:[247,249,252]}, theme:'grid',
  });
  doc.save(`EMBEE_FabricRequirement_${keyLabel.replace(/[\s/]/g,'')}Summary_${season||''}.pdf`);
}
function FabricRequirementPage({fabricLines,onUpdateLine,onDeleteLine,onDeleteManyLines,onAddLine,onAddManyLines,onDuplicateLine,onMergeDuplicateStyles,season,accessoryStyles}){
  const [search,setSearch] = useState('');
  const [supplierFilter,setSupplierFilter] = useState('');
  const [brandFilter,setBrandFilter] = useState('');
  const [partFilter,setPartFilter] = useState('');
  const [mtsrFilter,setMtsrFilter] = useState('');
  const [incotermFilter,setIncotermFilter] = useState('');
  const [fabSortBy,setFabSortBy] = useState('');
  const [fabSortDir,setFabSortDir] = useState('asc'); // 'asc' (A→Z) | 'desc' (Z→A)
  const [summaryBy,setSummaryBy] = useState(''); // '' | 'modelCode' | 'supplier' | 'brand'
  const [pickStyleNo,setPickStyleNo] = useState('');
  const [pasteError,setPasteError] = useState('');
  const [selectedIds,setSelectedIds] = useState(()=>new Set());
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState({}); // {lineId: {field:rawValue,...}} — local only until Save Changes is clicked
  const draftCount = Object.keys(draft).length;
  const setCell = (lineId,field,val)=> setDraft(prev=>({...prev, [lineId]:{...(prev[lineId]||{}), [field]:val}}));
  const gridApiRef = React.useRef(null);

  const styleMap = useMemo(()=>fabricStyleMap(accessoryStyles),[accessoryStyles]);
  const styleOptions = useMemo(()=> (accessoryStyles||[])
    .filter(s=>s.styleNo)
    .map(s=>({value:s.styleNo, label:`${s.r3Code||s.styleNo} — ${s.description||'(no name)'} · CC ${s.cc||'—'}${s.rsCode?' · RS '+s.rsCode:''}`}))
    .sort((a,b)=>a.label.localeCompare(b.label)),
  [accessoryStyles]);
  // Once a style already has a fabric line, it drops out of the "add a new line" picker — the
  // way to get a second line for the same style (e.g. a different Fabric Part) is Duplicate on
  // the existing row, not re-picking it here. The full styleOptions list (including already-used
  // styles) is still used for re-linking an existing row's style in Edit mode, since that needs
  // to show the row's own current style as a valid choice.
  const usedStyleNos = useMemo(()=> new Set(fabricLines.map(l=>l.styleNo).filter(Boolean)),[fabricLines]);
  const addLineStyleOptions = useMemo(()=> styleOptions.filter(o=>!usedStyleNos.has(o.value)),[styleOptions,usedStyleNos]);

  const linesWithCalc = useMemo(()=>fabricLines.map(l=>{
    const style = styleMap[l.styleNo];
    return {line:l, style, calc: computeFabricLine2Calc(l, style||FABRIC2_STYLE_MISSING)};
  }),[fabricLines, styleMap]);

  const suppliers = useMemo(()=>[...new Set(linesWithCalc.map(x=>x.line.supplier).filter(Boolean))].sort(),[linesWithCalc]);
  const brands = useMemo(()=>[...new Set(linesWithCalc.map(x=>x.calc.brand).filter(Boolean))].sort(),[linesWithCalc]);
  const parts = useMemo(()=>[...new Set(linesWithCalc.map(x=>x.line.fabricPart).filter(Boolean))].sort(),[linesWithCalc]);
  const mtsrs = useMemo(()=>[...new Set(linesWithCalc.map(x=>x.line.mtsr).filter(Boolean))].sort(),[linesWithCalc]);
  const incoterms = useMemo(()=>[...new Set(linesWithCalc.map(x=>x.line.fobCifExW).filter(Boolean))].sort(),[linesWithCalc]);

  const filtered = useMemo(()=>{
    const rows = linesWithCalc.filter(x=>
      (!supplierFilter || x.line.supplier===supplierFilter) &&
      (!brandFilter || x.calc.brand===brandFilter) &&
      (!partFilter || x.line.fabricPart===partFilter) &&
      (!mtsrFilter || x.line.mtsr===mtsrFilter) &&
      (!incotermFilter || x.line.fobCifExW===incotermFilter) &&
      (!search || (x.calc.modelCode+' '+x.calc.modelName+' '+x.calc.cc+' '+x.line.cptName+' '+x.line.fabricPart).toLowerCase().includes(search.toLowerCase()))
    );
    if(!fabSortBy) return rows;
    const field = FABRIC_SORT_FIELDS.find(f=>f.key===fabSortBy);
    const getVal = x => field.from==='line' ? x.line[fabSortBy] : x.calc[fabSortBy];
    return [...rows].sort((a,b)=>{
      if(field && field.num){
        const cmp = (Number(getVal(a))||0) - (Number(getVal(b))||0);
        return fabSortDir==='asc' ? cmp : -cmp;
      }
      const cmp = String(getVal(a)||'').localeCompare(String(getVal(b)||''), undefined, {numeric:true, sensitivity:'base'});
      return fabSortDir==='asc' ? cmp : -cmp;
    });
  },[linesWithCalc,supplierFilter,brandFilter,partFilter,mtsrFilter,incotermFilter,search,fabSortBy,fabSortDir]);

  // Selecting rows is separate from filtering — filtering narrows what's visible, selecting
  // picks the actual subset you'll place an order against. Export uses the selection when
  // anything is checked, and falls back to "everything currently filtered" when nothing is.
  const toggleSelect = (id)=> setSelectedIds(prev=>{ const next=new Set(prev); next.has(id)? next.delete(id) : next.add(id); return next; });
  const allFilteredSelected = filtered.length>0 && filtered.every(x=>selectedIds.has(x.line.id));
  const toggleSelectAll = ()=> setSelectedIds(prev=>{
    if(allFilteredSelected){ const next=new Set(prev); filtered.forEach(x=>next.delete(x.line.id)); return next; }
    const next=new Set(prev); filtered.forEach(x=>next.add(x.line.id)); return next;
  });
  const selectedLines = fabricLines.filter(l=>selectedIds.has(l.id));
  const exportLines = selectedLines.length ? selectedLines : filtered.map(x=>x.line);
  const exportLabel = selectedLines.length ? ` Selected (${selectedLines.length})` : ` All (${filtered.length})`;
  const deleteSelected = ()=>{
    if(!selectedLines.length) return;
    if(!window.confirm(`Delete ${selectedLines.length} selected fabric line(s)? This can't be undone.`)) return;
    onDeleteManyLines(selectedLines.map(l=>l.id));
    setSelectedIds(new Set());
  };
  const duplicateLine = (line)=> onDuplicateLine(line.id);

  const totals = useMemo(()=>filtered.reduce((a,x)=>{
    a.totalCommitment += x.calc.totalCommitment; a.toBeOrdered += x.calc.totalFabricToBeOrdered;
    a.totalValue += x.calc.totalValue; a.totalContainers += x.calc.totalContainers;
    return a;
  },{totalCommitment:0,toBeOrdered:0,totalValue:0,totalContainers:0}),[filtered]);
  const smtDyedZeroCount = useMemo(()=>linesWithCalc.filter(x=>x.style && x.calc.smtDyedPct===0).length,[linesWithCalc]);

  const summaryRows = useMemo(()=>{
    if(!summaryBy) return [];
    const map = {};
    filtered.forEach(x=>{
      const key = (summaryBy==='modelCode'? x.calc.modelCode : summaryBy==='supplier'? x.line.supplier : x.calc.brand) || 'Unspecified';
      if(!map[key]) map[key] = {key, lines:0, toBeOrdered:0, totalValue:0, totalContainers:0};
      map[key].lines++; map[key].toBeOrdered += x.calc.totalFabricToBeOrdered;
      map[key].totalValue += x.calc.totalValue; map[key].totalContainers += x.calc.totalContainers;
    });
    return Object.values(map).sort((a,b)=>b.toBeOrdered-a.toBeOrdered);
  },[filtered,summaryBy]);

  const doAddLine = ()=>{
    if(!pickStyleNo){ alert('Pick a style first — Fabric Requirement lines are always tied to a Selection File style.'); return; }
    onAddLine(season, pickStyleNo);
    setPickStyleNo('');
  };
  const doAddAllFromSelectionFile = ()=>{
    if(!addLineStyleOptions.length) return;
    const lines = addLineStyleOptions.map(o=>blankFabricLine2(season, o.value));
    onAddManyLines(lines);
  };
  const handleReadPaste = ()=>{
    setPasteError('');
    const raw = gridApiRef.current ? gridApiRef.current.getData() : [];
    if(!raw.some(row=>row.some(c=>c!=null && String(c).trim()!==''))){ setPasteError('Paste some rows first.'); return; }
    const {rows, skipped} = parseFabricPasteGrid(raw, season, accessoryStyles);
    if(!rows.length){ setPasteError('No rows matched a style in this season\'s Selection File. Column A must be the Model Code (Iman) or Style Number — check it against Selection File → Viewing.'); return; }
    onAddManyLines(rows);
    if(gridApiRef.current) gridApiRef.current.clear();
    if(skipped) alert(`Added ${rows.length} line(s). ${skipped} row(s) were skipped — column A didn't match any style in this season's Selection File.`);
  };
  const toggleEditing = ()=>{
    if(editing && draftCount && !window.confirm(`Discard ${draftCount} unsaved row edit(s)?`)) return;
    setEditing(e=>!e); setDraft({});
  };
  const FABRIC_NUMERIC_FIELDS = ['fabricSharing','fabricConsumption','extraConsumptionPct','fabricPrice','perContainerQty40HQ'];
  const saveAllEdits = ()=>{
    if(!draftCount) return;
    Object.entries(draft).forEach(([lineId,changes])=>{
      const coerced = {};
      Object.entries(changes).forEach(([field,val])=>{ coerced[field] = FABRIC_NUMERIC_FIELDS.includes(field) ? (Number(val)||0) : val; });
      onUpdateLine(lineId, coerced);
    });
    setDraft({});
  };

  return (
    <div>
      <div className="section" style={{marginBottom:16,background:'var(--primary-soft)',border:'1px solid var(--primary)'}}>
        <div className="section-body" style={{fontSize:13,color:'var(--ink-soft)',display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <span>
            Brand, CC, Model Code, Model Name, Selection Qty, Yarn, SMT Dyed and TTL FG+CPT Stocks come <b>live</b> from
            this season's Selection File — pick a style below rather than typing them in, and they'll always match
            whatever's currently in Selection File, including edits made after this line was created.
          </span>
          <button className="btn" style={{flex:'none'}} onClick={()=>{ if(window.confirm('Merge duplicate style records for this season and relink any fabric lines pointing at an outdated duplicate? This is a one-time cleanup and is safe to run any time.')) onMergeDuplicateStyles(); }}>
            🔧 Merge duplicate styles
          </button>
        </div>
      </div>
      {smtDyedZeroCount>0 && (
        <div className="section" style={{marginBottom:16,background:'#fff3cd',border:'1px solid #e0b400'}}>
          <div className="section-body" style={{fontSize:13,color:'#6b5300'}}>
            ⚠ <b>{smtDyedZeroCount} of {linesWithCalc.length} line(s) have SMT Dyed = 0 in Selection File</b> — Total
            Commitment (and everything calculated from it) is correctly 0 for those until SMT Dyed is filled in. This
            is not a calculation problem — go to <b>Selection File → Viewing → ✎ Edit</b>, fill in SMT Dyed for those
            styles, and click <b>Save Changes</b> there. Rows affected here are marked with ⚠ in the SMT Dyed column.
          </div>
        </div>
      )}

      <div className="kpi-grid">
        <KpiCard label="Fabric Lines" value={fmt(filtered.length)} />
        <KpiCard label="Total Commitment" value={fmt(totals.totalCommitment.toFixed(0))} />
        <KpiCard label="Total Fabric to be Ordered" value={fmt(totals.toBeOrdered.toFixed(0))} />
        <KpiCard label="Total Value" value={fmt(totals.totalValue.toFixed(2))} />
        <KpiCard label="Total Containers" value={totals.totalContainers.toFixed(2)} />
      </div>

      <div className="section" style={{marginBottom:16}}>
        <div className="section-head"><div className="section-title">Add Fabric Lines</div></div>
        <div className="section-body">
          <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginBottom:14}}>
            <button className="btn primary" disabled={!addLineStyleOptions.length} onClick={doAddAllFromSelectionFile}>
              ⚡ Take All from Selection File{addLineStyleOptions.length? ` (${addLineStyleOptions.length})`:''}
            </button>
            <span className="foot-note" style={{margin:0}}>
              {!styleOptions.length ? 'No styles found — import this season\'s Selection File first.'
                : !addLineStyleOptions.length ? 'Every style already has a line.'
                : `Creates one blank line per remaining style (${addLineStyleOptions.length}) — Brand/CC/Model/Selection Qty/etc. fill in automatically, you fill in Fabric Part/CPT/Supplier/consumption/price below.`}
            </span>
          </div>
          <div className="acc-subhead" style={{margin:'4px 0 8px'}}>Or add just one specific style</div>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:16}}>
            <SearchableSelect options={addLineStyleOptions} value={pickStyleNo} onChange={setPickStyleNo} placeholder="Pick a single style from Selection File…" />
            <button className="btn" onClick={doAddLine}><Icon name="plus" size={14}/> Add one line</button>
          </div>
          <div className="acc-subhead" style={{margin:'4px 0 8px'}}>Or bulk-add from Excel</div>
          <div className="foot-note" style={{marginTop:0}}>
            Open Excel or Google Sheets, copy your Fabric Part/CPT/Supplier/consumption/price columns, click the first
            cell below, then paste. Column A must be the <b>Model Code (Iman)</b> or <b>Style Number</b> so each row
            can be matched to a style — Brand, CC, Model Name, Selection Qty, Yarn, SMT Dyed and any totals in your
            sheet are ignored on purpose, those always come live from Selection File.
          </div>
          <ExcelGridInput gridRef={gridApiRef} cols={FABRIC_PASTE_COLUMNS.length} rows={150} />
          {pasteError && <div className="foot-note" style={{color:'var(--red)'}}>{pasteError}</div>}
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button type="button" className="btn" onClick={()=>gridApiRef.current && gridApiRef.current.clear()}>Clear Data</button>
            <button type="button" className="btn primary" onClick={handleReadPaste}>Add Pasted Lines</button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">Fabric Lines <span className="badge-count">{filtered.length}</span></div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            {editing && <span className="badge-count" style={{background:draftCount?'#fff3cd':undefined}}>{draftCount} unsaved</span>}
            <button className={"btn"+(editing?" primary":"")} onClick={toggleEditing}>{editing? '✕ Exit Edit Mode':'✎ Edit'}</button>
            {editing && <button className="btn primary" disabled={!draftCount} onClick={saveAllEdits}>💾 Save Changes</button>}
            {editing && draftCount>0 && <button className="btn" onClick={()=>{ if(window.confirm(`Discard ${draftCount} unsaved row edit(s)?`)) setDraft({}); }}>Discard</button>}
            {selectedLines.length>0 && <button className="btn" onClick={()=>setSelectedIds(new Set())}>Clear selection ({selectedLines.length})</button>}
            {selectedLines.length>0 && <button className="btn" style={{color:'var(--red)',borderColor:'var(--red)'}} onClick={deleteSelected}>🗑 Delete Selected ({selectedLines.length})</button>}
            <button className="btn" onClick={()=> summaryBy ? exportFabricSummaryExcel(season, summaryBy, summaryRows) : exportFabricExcel(season, exportLines, accessoryStyles)}>⬇ Export{summaryBy? ' Summary':exportLabel} Excel</button>
            <button className="btn" onClick={()=> summaryBy ? exportFabricSummaryPDF(season, summaryBy, summaryRows) : exportFabricPDF(season, exportLines, accessoryStyles)}>⬇ Export{summaryBy? ' Summary':exportLabel} PDF</button>
            <button className="btn" onClick={()=>window.print()}>🖨 Print</button>
          </div>
        </div>
        <div className="section-body">
          {editing && <div className="foot-note" style={{marginTop:0,marginBottom:10}}>Click any cell to correct it, then click <b>Save Changes</b> — nothing is saved until you click it.</div>}
          <div className="filter-row">
            <input type="text" placeholder="Search style / model / fabric…" value={search} onChange={e=>setSearch(e.target.value)} style={{minWidth:220}} />
            <select value={supplierFilter} onChange={e=>setSupplierFilter(e.target.value)}>
              <option value="">Supplier: All</option>
              {suppliers.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={brandFilter} onChange={e=>setBrandFilter(e.target.value)}>
              <option value="">Brand: All</option>
              {brands.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={partFilter} onChange={e=>setPartFilter(e.target.value)}>
              <option value="">Fabric Part: All</option>
              {parts.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={mtsrFilter} onChange={e=>setMtsrFilter(e.target.value)}>
              <option value="">MTSR: All</option>
              {mtsrs.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={incotermFilter} onChange={e=>setIncotermFilter(e.target.value)}>
              <option value="">FOB/CIF/Ex-W: All</option>
              {incoterms.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <span style={{flex:1}}></span>
            <select value={fabSortBy} onChange={e=>setFabSortBy(e.target.value)}>
              <option value="">Sort: Original order</option>
              {FABRIC_SORT_FIELDS.map(f=><option key={f.key} value={f.key}>Sort by {f.label}</option>)}
            </select>
            {fabSortBy && (
              <button type="button" className="btn" onClick={()=>setFabSortDir(d=>d==='asc'?'desc':'asc')} style={{minWidth:90}}>
                {fabSortDir==='asc' ? 'A → Z' : 'Z → A'}
              </button>
            )}
            <select value={summaryBy} onChange={e=>setSummaryBy(e.target.value)}>
              <option value="">Table view</option>
              <option value="modelCode">Summary by Style/Model</option>
              <option value="supplier">Summary by Supplier</option>
              <option value="brand">Summary by Brand</option>
            </select>
          </div>

          {summaryBy ? (
            <div className="table-scroll">
              <table>
                <thead><tr><th>{summaryBy==='modelCode'?'Style / Model':summaryBy==='supplier'?'Supplier':'Brand'}</th><th className="num">Lines</th><th className="num">To be Ordered</th><th className="num">Total Value</th><th className="num">Containers</th></tr></thead>
                <tbody>
                  {summaryRows.map(r=>(
                    <tr key={r.key}>
                      <td className="mono">{r.key}</td>
                      <td className="num">{fmt(r.lines)}</td>
                      <td className="num">{fmt(r.toBeOrdered.toFixed(0))}</td>
                      <td className="num">{fmt(r.totalValue.toFixed(2))}</td>
                      <td className="num">{r.totalContainers.toFixed(2)}</td>
                    </tr>
                  ))}
                  {!summaryRows.length && <tr><td colSpan={5} className="empty">No fabric lines match this filter.</td></tr>}
                </tbody>
              </table>
            </div>
          ) : !filtered.length ? <div className="empty">No fabric lines yet — pick a style above and click Add line, or bulk-paste several at once.</div> : (
            <div className="table-scroll">
              <table className="grid-table">
                <thead>
                  <tr>
                    <th style={{textAlign:'center'}}><input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAll} title="Select all filtered rows" /></th>
                    <th className="stickycol lbl">Style</th><th className="lbl">Brand</th><th className="lbl">Fabric Part</th>
                    <th className="lbl">CC</th><th className="lbl">Model Code</th><th className="lbl">Model Name</th>
                    <th>Selection QTY</th><th>Yarn</th><th>SMT Dyed</th><th className="lbl">Other Destination Selection</th>
                    <th>Total Commitment</th><th className="lbl">DSM</th><th className="lbl">CPT Model Code</th>
                    <th className="lbl">CPT Name</th><th className="lbl">CPT Item Code</th><th className="lbl">CPT Color</th>
                    <th>Fabric Sharing</th><th className="lbl">Supplier</th><th>FG Qty as per Sharing</th>
                    <th>Fabric Consumption</th><th>Extra Consumption %</th><th>Total Fabric to be Ordered</th>
                    <th className="lbl">Units</th><th className="lbl">CW</th><th className="lbl">Weight</th><th className="lbl">MTSR</th>
                    <th className="lbl">Stamped Hanger Status</th><th className="lbl">FOB / CIF / Ex-W</th>
                    <th>Fabric price</th><th>Total Value</th><th>Per container Qty (40" HQ)</th><th>Total Containers</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(x=>(
                    <FabricLineRow key={x.line.id} line={x.line} style={x.style} styleOptions={styleOptions}
                      editing={editing} rowDraft={draft[x.line.id]} onDraftChange={setCell} onDelete={onDeleteLine} onDuplicate={duplicateLine}
                      selected={selectedIds.has(x.line.id)} onToggleSelect={toggleSelect} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={11} style={{fontWeight:700,borderTop:'2px solid var(--border)'}}>TOTAL ({filtered.length} lines)</td>
                    <td className="num" style={{fontWeight:700,borderTop:'2px solid var(--border)'}}>{fmt(totals.totalCommitment.toFixed(2))}</td>
                    <td colSpan={9} style={{borderTop:'2px solid var(--border)'}}></td>
                    <td className="num" style={{fontWeight:700,borderTop:'2px solid var(--border)'}}>{fmt(totals.toBeOrdered.toFixed(2))}</td>
                    <td colSpan={7} style={{borderTop:'2px solid var(--border)'}}></td>
                    <td className="num" style={{fontWeight:700,borderTop:'2px solid var(--border)'}}>{fmt(totals.totalValue.toFixed(2))}</td>
                    <td style={{borderTop:'2px solid var(--border)'}}></td>
                    <td className="num" style={{fontWeight:700,borderTop:'2px solid var(--border)'}}>{totals.totalContainers.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
          <div className="foot-note">
            Total Commitment = Selection Qty × SMT Dyed% · FG Qty as per Sharing = Available FG/CPT Stock (from Selection File's
            TTL FG+CPT Stocks) · Total Fabric to be Ordered = (Total Commitment − FG Qty as per Sharing) × Fabric Consumption ×
            (1 + Extra Consumption %) · Total Value = Total Fabric to be Ordered × Fabric price · Total Containers = ROUND UP
            (Total Fabric to be Ordered ÷ Per-container Qty).
          </div>
        </div>
      </div>
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

// Editable cells stay real <input type="number"> fields (typing/arrow-keys work exactly as
// before). Non-editable (computed) cells render as plain comma-formatted text instead of a
// disabled input box — reads like an actual spreadsheet cell rather than a greyed-out field.
function NumCell({value,onChange,editable=true,bold,color,bg}){
  if(!editable){
    const num = Number(value)||0;
    return (
      <div className="cell-computed" style={{fontWeight:bold?700:400, color: color||undefined, background: bg||undefined}}>
        {num.toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits:2})}
      </div>
    );
  }
  return (
    <input type="number" className="cell-input"
      style={{fontWeight:bold?700:400, color: color||undefined, background: bg||undefined}}
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

const ORDER_MGMT_SORTS = [
  {key:'styleNo', label:'Style No'},
  {key:'balanceToOrder', label:'Balance to Order'},
  {key:'needToIssue', label:'Need to Issue'},
  {key:'selectionQty', label:'Selection Qty'},
];
const DEMAND_GROUP_FIELDS = [
  {key:'all', label:'All Together (Grand Total)'},
  {key:'styleNo', label:'Style'},
  {key:'r3Code', label:'Model (Iman Code)'},
  {key:'color', label:'Colour'},
  {key:'season', label:'Season'},
  {key:'supplier', label:'Supplier'},
  {key:'factory', label:'Factory'},
];
// Lets any Demand Analysis grouping be broken down into S/M/L/XL/2XL/3XL/4XL columns for one
// chosen metric at a time, instead of just a single rolled-up number — e.g. "Style, size-wise
// Acc. Ordered Qty" shows exactly how many of each size are ordered per style.
const SIZE_WISE_METRICS = [
  {key:'', label:'Off — totals only'},
  {key:'all', label:'All Metrics (every column, size-wise)'},
  {key:'ordered', label:'Acc. Ordered Qty', color:'ordered'},
  {key:'received', label:'PO Qty Received', color:'poQty'},
  {key:'fgStock', label:'FG Stock', color:'fgStock'},
  {key:'issued', label:'Order Issued to Fty', color:'issued'},
  {key:'stockBalance', label:'Balance Acc. Stock', color:'stockBal'},
  {key:'needToIssue', label:'Need to Issue', color:'needIssue'},
];
// Small self-contained draft editor for the 4 SMT% fields shown on a Demand Analysis
// size-wise block header — edits stay local until Save is clicked, same pattern as StyleCard.
function SmtHeaderBlock({styleInfo, onSave}){
  const startDraft = {yarnSmtPct:styleInfo.yarnSmtPct, fabricGreigeSmtPct:styleInfo.fabricGreigeSmtPct, fabricDyingSmtPct:styleInfo.fabricDyingSmtPct, accSmtPct:styleInfo.accSmtPct};
  const [draft,setDraft] = useState(startDraft);
  const [justSaved,setJustSaved] = useState(false);
  const dirty = draft.yarnSmtPct!==styleInfo.yarnSmtPct || draft.fabricGreigeSmtPct!==styleInfo.fabricGreigeSmtPct
    || draft.fabricDyingSmtPct!==styleInfo.fabricDyingSmtPct || draft.accSmtPct!==styleInfo.accSmtPct;
  const field = (f,v)=> setDraft(d=>({...d,[f]:v}));
  const save = ()=>{ onSave(draft); setJustSaved(true); setTimeout(()=>setJustSaved(false),1800); };
  const discard = ()=> setDraft({yarnSmtPct:styleInfo.yarnSmtPct, fabricGreigeSmtPct:styleInfo.fabricGreigeSmtPct, fabricDyingSmtPct:styleInfo.fabricDyingSmtPct, accSmtPct:styleInfo.accSmtPct});
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:13}}>
      <div>
        <b>Style#</b> <span className="mono">{styleInfo.styleNo}</span>
        <span style={{marginLeft:18}}><b>Model:</b> <span className="mono">{styleInfo.r3Code||'—'}</span></span>
        <span style={{marginLeft:18}}><b>Colour:</b> {styleInfo.color||'—'}</span>
      </div>
      <div><b>Selection Qty:</b> <span className="mono">{fmt(styleInfo.selectionQty)}</span> Pcs</div>
      <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'6px 22px'}}>
        <span><b>Yarn SMT%:</b>{' '}
          <input type="number" className="mono" value={draft.yarnSmtPct} onFocus={e=>e.target.select()}
            onChange={e=>field('yarnSmtPct',Number(e.target.value)||0)}
            style={{width:58,fontWeight:700,border:'1px solid var(--border)',borderRadius:4,padding:'2px 5px'}} />
        </span>
        <span><b>Fabric Greige SMT%:</b>{' '}
          <input type="number" className="mono" value={draft.fabricGreigeSmtPct} onFocus={e=>e.target.select()}
            onChange={e=>field('fabricGreigeSmtPct',Number(e.target.value)||0)}
            style={{width:58,fontWeight:700,border:'1px solid var(--border)',borderRadius:4,padding:'2px 5px'}} />
        </span>
        <span><b>Fabric Dying SMT%:</b>{' '}
          <input type="number" className="mono" value={draft.fabricDyingSmtPct} onFocus={e=>e.target.select()}
            onChange={e=>field('fabricDyingSmtPct',Number(e.target.value)||0)}
            style={{width:58,fontWeight:700,border:'1px solid var(--border)',borderRadius:4,padding:'2px 5px'}} />
        </span>
        <span><b>ACC. SMT%:</b>{' '}
          <input type="number" className="mono" value={draft.accSmtPct} onFocus={e=>e.target.select()}
            onChange={e=>field('accSmtPct',Number(e.target.value)||0)}
            style={{width:58,fontWeight:700,border:'1px solid var(--border)',borderRadius:4,padding:'2px 5px'}} />
        </span>
        <button type="button" className={"btn"+(dirty?" primary":"")} disabled={!dirty} onClick={save} style={{padding:'3px 10px',fontSize:11}}>Save</button>
        {dirty && <button type="button" className="btn" onClick={discard} style={{padding:'3px 8px',fontSize:11}}>Discard</button>}
        {dirty && <span className="acc-kpi-badge amber">● Unsaved</span>}
        {justSaved && !dirty && <span className="acc-kpi-badge green">✓ Saved</span>}
      </div>
      <div><b>Total Commitment:</b> <span className="mono" style={{fontWeight:700}}>{fmt(Math.round(styleInfo.selectionQty * draft.fabricDyingSmtPct/100))}</span> Pcs</div>
    </div>
  );
}
function AccessoriesPage({styles,setStyles,firmOrderBatches,shipmentBatches,seasonFilter}){
  const [query,setQuery] = useState('');
  const [openId,setOpenId] = useState(styles[0]? styles[0].id : null);
  const [sortKey,setSortKey] = useState('styleNo');
  const [sortDir,setSortDir] = useState('asc');
  const [viewMode,setViewMode] = useState('cards'); // 'cards' | 'analysis'
  const [groupBy,setGroupBy] = useState('styleNo');
  const [sizeWiseMetric,setSizeWiseMetric] = useState('');

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

  // Computed once per style (calc + summary + status) so the KPI strip, export, every card's
  // status pill, and the demand analysis table all read from the same numbers instead of
  // recalculating repeatedly.
  const enriched = useMemo(()=>{
    return styles
      .filter(s=> (!seasonFilter || s.season===seasonFilter) && (!query || (s.styleNo+' '+s.description).toLowerCase().includes(query.toLowerCase())))
      .map(s=>{
        const calc = computeStyleCalc(s);
        const summary = computeStyleSummary(s, firmOrderBatches, calc, shipmentBatches);
        return {style:s, calc, summary};
      });
  },[styles,seasonFilter,query,firmOrderBatches,shipmentBatches]);

  const sorted = useMemo(()=>{
    const val = (e)=>{
      if(sortKey==='styleNo') return e.style.styleNo||'';
      if(sortKey==='balanceToOrder') return e.calc.kpi.accBalanceToOrderKpi;
      if(sortKey==='needToIssue') return e.calc.totals.needToIssue;
      if(sortKey==='selectionQty') return n(e.style.selectionQty);
      return '';
    };
    return [...enriched].sort((a,b)=>{
      const av=val(a), bv=val(b);
      if(typeof av==='string') return sortDir==='asc'? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir==='asc'? av-bv : bv-av;
    });
  },[enriched,sortKey,sortDir]);

  // Demand analysis — groups every style currently matching the search box by whichever
  // dimension is picked (Style / Model / Colour / Season / Supplier / Factory), or collapses
  // everything into one row for an overall grand total.
  const groupedRows = useMemo(()=>{
    const map = {};
    enriched.forEach(({style,calc})=>{
      const key = groupBy==='all' ? 'All Styles Combined' : (style[groupBy] || 'Unspecified');
      if(!map[key]) map[key] = {key, count:0, selectionQty:0, ordered:0, received:0, fgStock:0, issued:0, stockBalance:0, needToIssue:0, balanceToOrder:0};
      const g = map[key];
      g.count++; g.selectionQty += n(style.selectionQty); g.ordered += calc.totals.ordered; g.received += calc.totals.received;
      g.fgStock += calc.totals.fgStock; g.issued += calc.totals.issued; g.stockBalance += calc.totals.balanceAccStock;
      g.needToIssue += calc.totals.needToIssue; g.balanceToOrder += calc.kpi.accBalanceToOrderKpi;
    });
    return Object.values(map).sort((a,b)=>b.selectionQty-a.selectionQty);
  },[enriched,groupBy]);

  // Same grouping as above, but broken into S/M/L/XL/2XL/3XL/4XL columns for one metric at a
  // time instead of a single rolled-up number.
  const sizeWiseSource = (style,calc,metric)=>{
    if(metric==='ordered') return calc.orderedTotal;
    if(metric==='received') return calc.receivedTotal;
    if(metric==='fgStock') return style.fgStock;
    if(metric==='issued') return calc.issuedTotal;
    if(metric==='stockBalance') return calc.balanceAccStock;
    if(metric==='needToIssue') return calc.needToIssue;
    return null;
  };
  const activeSizeWiseMetricKeys = useMemo(()=>{
    if(!sizeWiseMetric) return [];
    if(sizeWiseMetric==='all') return SIZE_WISE_METRICS.filter(m=>m.key && m.key!=='all').map(m=>m.key);
    return [sizeWiseMetric];
  },[sizeWiseMetric]);
  const sizeWiseRows = useMemo(()=>{
    if(!activeSizeWiseMetricKeys.length) return [];
    const map = {};
    enriched.forEach(({style,calc})=>{
      const key = groupBy==='all' ? 'All Styles Combined' : (style[groupBy] || 'Unspecified');
      if(!map[key]){
        map[key] = {key, count:0, metrics:{}, styles:[]};
        activeSizeWiseMetricKeys.forEach(mk=>{ map[key].metrics[mk] = zeroSizes(); });
      }
      map[key].count++;
      map[key].styles.push({id:style.id, styleNo:style.styleNo, r3Code:style.r3Code, color:style.color, selectionQty:n(style.selectionQty),
        yarnSmtPct:n(style.yarnSmtPct), fabricGreigeSmtPct:n(style.fabricGreigeSmtPct), fabricDyingSmtPct:n(style.fabricDyingSmtPct), accSmtPct:n(style.accSmtPct)});
      activeSizeWiseMetricKeys.forEach(mk=>{
        const sizeObj = sizeWiseSource(style,calc,mk) || zeroSizes();
        SIZES.forEach(sz=>{ map[key].metrics[mk][sz] += n(sizeObj[sz]); });
      });
    });
    const firstMetric = activeSizeWiseMetricKeys[0];
    return Object.values(map).sort((a,b)=>sizeSum(b.metrics[firstMetric])-sizeSum(a.metrics[firstMetric]));
  },[enriched,groupBy,activeSizeWiseMetricKeys]);

  const analysisExportRows = sizeWiseMetric
    ? sizeWiseRows.map(g=>{
        const row = {[DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label]: g.key, 'Styles':g.count};
        activeSizeWiseMetricKeys.forEach(mk=>{
          const mLabel = SIZE_WISE_METRICS.find(m=>m.key===mk).label;
          SIZES.forEach(sz=>{ row[mLabel+' — '+sz] = g.metrics[mk][sz]; });
          row[mLabel+' — Total'] = sizeSum(g.metrics[mk]);
        });
        return row;
      })
    : groupedRows.map(g=>({
        [DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label]: g.key, 'Styles':g.count, 'Selection Qty':g.selectionQty,
        'Acc. Ordered Qty':g.ordered, 'PO Qty Received':g.received, 'FG Stock':g.fgStock, 'Order Issued to Fty':g.issued,
        'Balance Acc. Stock':g.stockBalance, 'Need to Issue':g.needToIssue, 'Balance to Order':g.balanceToOrder,
      }));

  const exportRows = sorted.map(({style,calc,summary})=>({
    'Style No':style.styleNo, Description:style.description, Season:style.season, Factory:style.factory, Supplier:style.supplier,
    'Selection Qty':n(style.selectionQty), 'Total Ordered':calc.totals.ordered, 'Balance to Order':calc.kpi.accBalanceToOrderKpi,
    'FG Stock':calc.totals.fgStock, 'Total Issued':calc.totals.issued, 'Warehouse Balance':calc.totals.balanceAccStock,
    'Need to Issue':calc.totals.needToIssue, Status:summary.status,
  }));

  return (
    <div>
      <div className="filter-row">
        <input type="text" placeholder="Search style # or description…" value={query} onChange={e=>setQuery(e.target.value)} style={{minWidth:240}} />
        <button type="button" className={"btn"+(viewMode==='cards'?" primary":"")} onClick={()=>setViewMode('cards')}>Style Cards</button>
        <button type="button" className={"btn"+(viewMode==='analysis'?" primary":"")} onClick={()=>setViewMode('analysis')}>Demand Analysis</button>
        {viewMode==='cards' ? (
          <React.Fragment>
            <select value={sortKey} onChange={e=>setSortKey(e.target.value)} title="Sort by">
              {ORDER_MGMT_SORTS.map(s=><option key={s.key} value={s.key}>Sort by {s.label}</option>)}
            </select>
            <button type="button" className={"btn"+(sortDir==='asc'?" primary":"")} onClick={()=>setSortDir('asc')}>
              <Icon name="chevronDown" size={13} style={{transform:'rotate(180deg)'}} /> Asc
            </button>
            <button type="button" className={"btn"+(sortDir==='desc'?" primary":"")} onClick={()=>setSortDir('desc')}>
              <Icon name="chevronDown" size={13} /> Desc
            </button>
            <button className="btn primary add-style-btn" onClick={addStyle}><Icon name="plus" size={14}/> Add style</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <select value={groupBy} onChange={e=>setGroupBy(e.target.value)} title="Group by">
              {DEMAND_GROUP_FIELDS.map(f=><option key={f.key} value={f.key}>Group by {f.label}</option>)}
            </select>
            <select value={sizeWiseMetric} onChange={e=>setSizeWiseMetric(e.target.value)} title="Size-wise breakdown">
              {SIZE_WISE_METRICS.map(m=><option key={m.key} value={m.key}>{m.key? 'Size-wise: '+m.label : m.label}</option>)}
            </select>
          </React.Fragment>
        )}
        <span className="badge-count">{sorted.length} style{sorted.length!==1?'s':''}</span>
        <span style={{flex:1}}></span>
        {sizeWiseMetric
          ? <SizeWiseExportButtons sizeWiseRows={sizeWiseRows} metricKeys={activeSizeWiseMetricKeys} groupByLabel={DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label} />
          : <ExportButtons title={viewMode==='cards'?'Order Management':'Demand Analysis'} baseFilename={viewMode==='cards'?'order-management':'demand-analysis'} rows={viewMode==='cards'?exportRows:analysisExportRows} />
        }
      </div>

      {viewMode==='analysis' ? (
        <div className="section">
          <div className="section-head">
            <div className="section-title">
              Demand Analysis — {DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label}
              {sizeWiseMetric && <span style={{color:'var(--ink-faint)',fontWeight:500}}> · {SIZE_WISE_METRICS.find(m=>m.key===sizeWiseMetric).label}, size-wise</span>}
            </div>
          </div>
          <div className="section-body table-scroll">
            {sizeWiseMetric ? (
              !sizeWiseRows.length ? <div className="empty">No styles match this search.</div> : (
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  {sizeWiseRows.map(g=>(
                    <div key={g.key} style={{border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
                      <div style={{padding:'12px 14px',background:'var(--surface-alt)',borderBottom:'1px solid var(--border)'}}>
                        {g.styles.length===1 ? (
                          <SmtHeaderBlock styleInfo={g.styles[0]} onSave={patch=>updateStyle(g.styles[0].id, st=>({...st,...patch}))} />
                        ) : (
                          <React.Fragment>
                            <span className="mono" style={{fontWeight:700,fontSize:13}}>{g.key}</span>
                            <span className="badge-count" style={{marginLeft:12}}>{g.count} styles</span>
                            <span style={{fontSize:11.5,color:'var(--ink-faint)',marginLeft:12}}>{g.styles.map(s=>s.styleNo).join(', ')}</span>
                          </React.Fragment>
                        )}
                      </div>
                      <div className="table-scroll">
                        <table className="grid-table" style={{margin:0}}>
                          <thead>
                            <tr>
                              <th className="stickycol lbl">Sizes</th>
                              {activeSizeWiseMetricKeys.map(mk=>{
                                const m = SIZE_WISE_METRICS.find(mm=>mm.key===mk);
                                return <th key={mk} style={{background:ORDER_MGMT_COLORS[m.color].head}}>{m.label}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {SIZES.map(sz=>(
                              <tr key={sz}>
                                <td className="stickycol lbl">{sz}</td>
                                {activeSizeWiseMetricKeys.map(mk=>{
                                  const m = SIZE_WISE_METRICS.find(mm=>mm.key===mk);
                                  return <td key={mk} style={{background:ORDER_MGMT_COLORS[m.color].bg}}>{fmt(g.metrics[mk][sz])}</td>;
                                })}
                              </tr>
                            ))}
                            <tr className="grid-total-row">
                              <td className="stickycol lbl">Total</td>
                              {activeSizeWiseMetricKeys.map(mk=>{
                                const m = SIZE_WISE_METRICS.find(mm=>mm.key===mk);
                                return <td key={mk} style={{background:ORDER_MGMT_COLORS[m.color].head,fontWeight:700}}>{fmt(sizeSum(g.metrics[mk]))}</td>;
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : !groupedRows.length ? <div className="empty">No styles match this search.</div> : (
              <table className="grid-table">
                <thead>
                  <tr>
                    <th className="stickycol lbl">{DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label}</th>
                    <th>Styles</th>
                    <th>Selection Qty</th>
                    <th style={{background:ORDER_MGMT_COLORS.ordered.head}}>Acc. Ordered Qty</th>
                    <th style={{background:ORDER_MGMT_COLORS.poQty.head}}>PO Qty Received</th>
                    <th style={{background:ORDER_MGMT_COLORS.fgStock.head}}>FG Stock</th>
                    <th style={{background:ORDER_MGMT_COLORS.issued.head}}>Order Issued to Fty</th>
                    <th style={{background:ORDER_MGMT_COLORS.stockBal.head}}>Balance Acc. Stock</th>
                    <th style={{background:ORDER_MGMT_COLORS.needIssue.head}}>Need to Issue</th>
                    <th>Balance to Order</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedRows.map(g=>(
                    <tr key={g.key}>
                      <td className="stickycol lbl mono">{g.key}</td>
                      <td>{fmt(g.count)}</td>
                      <td>{fmt(g.selectionQty)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.ordered.bg}}>{fmt(g.ordered)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.poQty.bg}}>{fmt(g.received)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.fgStock.bg}}>{fmt(g.fgStock)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.issued.bg}}>{fmt(g.issued)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.stockBal.bg,color:balColor(g.stockBalance)}}>{fmt(g.stockBalance)}</td>
                      <td style={{background:ORDER_MGMT_COLORS.needIssue.bg,color:balColor(-g.needToIssue)}}>{fmt(g.needToIssue)}</td>
                      <td style={{color:balColor(g.balanceToOrder)}}>{fmt(g.balanceToOrder)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="foot-note" style={{padding:'0 19px 16px'}}>Same figures as the Style Cards view, rolled up by {DEMAND_GROUP_FIELDS.find(f=>f.key===groupBy).label.toLowerCase()} — switch grouping or size-wise breakdown any time, nothing here is recalculated differently.</div>
        </div>
      ) : (
        <React.Fragment>
          {sorted.length===0 && <div className="empty">No styles yet. <b>Add a style</b> to start planning accessories.</div>}

          {sorted.map(({style:st,calc,summary})=>(
            <StyleCard key={st.id} style={st} status={summary.status} open={openId===st.id}
              onToggle={()=>setOpenId(openId===st.id? null : st.id)}
              onUpdate={updater=>updateStyle(st.id,updater)}
              onDelete={()=>deleteStyle(st.id)} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

// One distinct colour per data category, used as a background tint on that category's columns
// (and a stronger tint on its header + total cells) across both tables — lets admins visually
// track "Ordered" vs "Received" vs "Stock" vs "Issued" vs "Need to Issue" at a glance, the way
// colour-coded column bands work in a real spreadsheet. Kept separate from balColor (which
// still colours the VALUE text red/green for negative/positive) so category identity and
// value sentiment never fight each other.
const ORDER_MGMT_COLORS = {
  ordered:   {bg:'rgba(0,130,195,.30)',  head:'rgba(0,130,195,.55)'},   // Acc. Ordered Qty — blue
  poQty:     {bg:'rgba(14,165,160,.30)', head:'rgba(14,165,160,.55)'},  // Size-wise PO Qty — teal
  fgStock:   {bg:'rgba(147,51,234,.26)', head:'rgba(147,51,234,.50)'},  // FG Stock — violet
  issued:    {bg:'rgba(200,121,10,.30)', head:'rgba(200,121,10,.55)'},  // Order Issued to Fty — amber
  stockBal:  {bg:'rgba(8,145,178,.26)',  head:'rgba(8,145,178,.52)'},   // Balance Acc. Stock — cyan
  needIssue: {bg:'rgba(220,38,38,.22)',  head:'rgba(220,38,38,.46)'},   // Need to Issue / Balance to Produce — rose
};
function StyleCard({style,status,open,onToggle,onUpdate,onDelete}){
  const [draft,setDraft] = useState(style); // local edits only — nothing here touches saved data until Save is clicked
  const [uploadState,setUploadState] = useState({busy:false,error:null,info:null});
  const [justSaved,setJustSaved] = useState(false);
  const calc = computeStyleCalc(draft); // recomputed live from the draft, so totals update as you type, before saving
  const dirty = JSON.stringify(draft) !== JSON.stringify(style);

  const field = (f,v)=> setDraft(st=>({...st,[f]:v}));
  const setWeekQty = (weekId,size,val)=> setDraft(st=>({...st,weeks:st.weeks.map(w=>w.id===weekId?{...w,qty:{...w.qty,[size]:val}}:w)}));
  const setWeekLabel = (weekId,val)=> setDraft(st=>({...st,weeks:st.weeks.map(w=>w.id===weekId?{...w,label:val}:w)}));
  const addWeek = ()=> setDraft(st=>({...st,weeks:[...st.weeks,{id:'wk_'+Date.now(),label:'WK'+(st.weeks.length+1),qty:zeroSizes()}]}));
  const removeWeek = (weekId)=> setDraft(st=>({...st,weeks:st.weeks.filter(w=>w.id!==weekId)}));

  const setPoField = (poId,f,val)=> setDraft(st=>({...st,pos:st.pos.map(p=>p.id===poId?{...p,[f]:val}:p)}));
  const setPoReceived = (poId,size,val)=> setDraft(st=>({...st,pos:st.pos.map(p=>p.id===poId?{...p,received:{...p.received,[size]:val}}:p)}));
  const addPo = ()=> setDraft(st=>({...st,pos:[...st.pos,{id:'po_'+Date.now(),poNumber:'',deliveredThird:'',ehd:'',garmentOrderQty:0,received:zeroSizes()}]}));
  const removePo = (poId)=> setDraft(st=>({...st,pos:st.pos.filter(p=>p.id!==poId)}));

  const handlePoFile = async (file)=>{
    setUploadState({busy:true,error:null,info:null});
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf,{type:'array', cellDates:true});
      const rows = parsePOUploadWorkbook(wb);
      let added=0, updated=0;
      setDraft(st=>{
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
      setUploadState({busy:false,error:null,info:`${added} PO${added!==1?'s':''} added, ${updated} updated from ${file.name} — click Save to keep this.`});
    }catch(e){
      setUploadState({busy:false,error:e.message,info:null});
    }
  };

  const setFgStock = (size,val)=> setDraft(st=>({...st,fgStock:{...st.fgStock,[size]:val}}));

  const setIssueQty = (isId,size,val)=> setDraft(st=>({...st,issues:st.issues.map(is=>is.id===isId?{...is,qty:{...is.qty,[size]:val}}:is)}));
  const setIssueLabel = (isId,val)=> setDraft(st=>({...st,issues:st.issues.map(is=>is.id===isId?{...is,label:val}:is)}));
  const addIssue = ()=> setDraft(st=>({...st,issues:[...st.issues,{id:'is_'+Date.now(),label:'Order '+(st.issues.length+1),qty:zeroSizes()}]}));
  const removeIssue = (isId)=> setDraft(st=>({...st,issues:st.issues.filter(is=>is.id!==isId)}));

  const save = ()=>{
    onUpdate(()=>draft);
    setJustSaved(true);
    setTimeout(()=>setJustSaved(false), 1800);
  };
  const discard = ()=> setDraft(style);

  return (
    <div className={"acc-card"+(open?" open":"")}>
      <div className="acc-card-head" onClick={onToggle}>
        <span className="acc-caret">▶</span>
        <input className="acc-style-no-input" value={draft.styleNo} onClick={e=>e.stopPropagation()} onChange={e=>field('styleNo',e.target.value)} />
        <input className="acc-style-desc-input" value={draft.description} onClick={e=>e.stopPropagation()} onChange={e=>field('description',e.target.value)} placeholder="Style description" />
        {status && <PlanningStatusPill status={status} />}
        <span className="acc-kpi-badge">Commit {(calc.kpi.pctOrdered*100).toFixed(1)}%</span>
        <span className={"acc-kpi-badge "+(calc.kpi.accBalanceToOrderKpi<0?'red':'green')}>Bal. to order {fmt(calc.kpi.accBalanceToOrderKpi)}</span>
        <span className={"acc-kpi-badge "+(calc.totals.needToIssue>0?'red':'green')}>Need to issue {fmt(calc.totals.needToIssue)}</span>
        {dirty && <span className="acc-kpi-badge amber" title="Unsaved changes — click Save to keep them">● Unsaved</span>}
        {justSaved && !dirty && <span className="acc-kpi-badge green">✓ Saved</span>}
        <button type="button" className={"btn"+(dirty?" primary":"")} disabled={!dirty} onClick={e=>{e.stopPropagation(); save();}} style={{padding:'4px 12px',fontSize:11.5}}>Save</button>
        {dirty && <button type="button" className="btn" onClick={e=>{e.stopPropagation(); discard();}} style={{padding:'4px 10px',fontSize:11.5}}>Discard</button>}
        <button className="icon-btn" onClick={e=>{e.stopPropagation();onDelete();}} title="Remove style">✕</button>
      </div>

      {open && (
        <div className="acc-card-body">
          <div className="acc-subhead">
            <span>Purchase Orders — Delivery Priority</span>
            <span style={{display:'flex',gap:8,alignItems:'center'}}>
              <button className="add-col-btn" onClick={()=>downloadPOTemplate()}>Download template</button>
              <PoUploadButton onFile={handlePoFile} busy={uploadState.busy} />
              <button className="add-col-btn" onClick={addPo}>+ Add PO</button>
            </span>
          </div>
          {uploadState.error && <div className="foot-note" style={{color:'var(--red)',marginTop:0}}>{uploadState.error}</div>}
          {uploadState.info && <div className="foot-note" style={{color:'var(--green)',marginTop:0}}>{uploadState.info}</div>}
          <div className="foot-note" style={{marginTop:0,marginBottom:10}}>Upload expects columns: <span className="mono">PO Number, Delivered Third, EHD, Garment Order Qty</span>, then one column per size (<span className="mono">S, M, L, XL, 2XL, 3XL, 4XL</span>). Matching PO numbers update in place; new ones are added. <b>Nothing here saves until you click Save above.</b></div>
          <div className="table-scroll">
            <table className="po-mini-table">
              <thead><tr><th className="lbl">PO#</th><th className="lbl">Delivered Third</th><th className="lbl">EHD</th><th>Garment Order Qty</th><th></th></tr></thead>
              <tbody>
                {draft.pos.map(p=>(
                  <tr key={p.id}>
                    <td><input type="text" value={p.poNumber} onChange={e=>setPoField(p.id,'poNumber',e.target.value)} placeholder="PO number" /></td>
                    <td><input type="text" value={p.deliveredThird} onChange={e=>setPoField(p.id,'deliveredThird',e.target.value)} placeholder="Third party" /></td>
                    <td><input type="date" value={p.ehd} onChange={e=>setPoField(p.id,'ehd',e.target.value)} /></td>
                    <td><input type="number" value={p.garmentOrderQty} onFocus={e=>e.target.select()} onChange={e=>setPoField(p.id,'garmentOrderQty',e.target.value===''?0:Number(e.target.value))} /></td>
                    <td><button className="icon-btn" onClick={()=>removePo(p.id)}>✕</button></td>
                  </tr>
                ))}
                {draft.pos.length===0 && <tr><td colSpan="5" className="empty" style={{padding:'12px'}}>No POs yet — add one, and it becomes an Orders-Received column below automatically.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="acc-subhead">
            <span>Weekly Order Plan vs Orders Received</span>
            <button className="add-col-btn" onClick={addWeek}>+ Add week</button>
          </div>
          <div className="table-scroll">
            <table className="grid-table">
              <thead>
                <tr>
                  <th className="stickycol lbl">Size</th>
                  {draft.weeks.map(w=>(
                    <th key={w.id} style={{background:ORDER_MGMT_COLORS.ordered.head}}>
                      <input className="col-head-label" value={w.label} onChange={e=>setWeekLabel(w.id,e.target.value)} />
                      {draft.weeks.length>1 && <span className="icon-btn" onClick={()=>removeWeek(w.id)} style={{marginLeft:2}}>✕</span>}
                    </th>
                  ))}
                  <th style={{background:ORDER_MGMT_COLORS.ordered.head}}>Total Ordered</th>
                  <th className="col-divider"></th>
                  {draft.pos.map(p=>(<th key={p.id} style={{background:ORDER_MGMT_COLORS.poQty.head}}>{p.poNumber||'PO'}</th>))}
                  <th style={{background:ORDER_MGMT_COLORS.poQty.head}}>Total Received</th>
                  <th>Balance to Order</th>
                  <th style={{background:ORDER_MGMT_COLORS.fgStock.head}}>FG Stock</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(size=>(
                  <tr key={size}>
                    <td className="stickycol">{size}</td>
                    {draft.weeks.map(w=>(
                      <td key={w.id}><NumCell value={w.qty[size]} onChange={val=>setWeekQty(w.id,size,val)} bg={ORDER_MGMT_COLORS.ordered.bg} /></td>
                    ))}
                    <td><NumCell value={calc.orderedTotal[size]} editable={false} bold bg={ORDER_MGMT_COLORS.ordered.bg} /></td>
                    <td className="col-divider"></td>
                    {draft.pos.map(p=>(
                      <td key={p.id}><NumCell value={p.received[size]} onChange={val=>setPoReceived(p.id,size,val)} bg={ORDER_MGMT_COLORS.poQty.bg} /></td>
                    ))}
                    <td><NumCell value={calc.receivedTotal[size]} editable={false} bold bg={ORDER_MGMT_COLORS.poQty.bg} /></td>
                    <td><NumCell value={calc.balanceToOrder[size]} editable={false} bold color={balColor(calc.balanceToOrder[size])} /></td>
                    <td><NumCell value={draft.fgStock[size]} onChange={val=>setFgStock(size,val)} bg={ORDER_MGMT_COLORS.fgStock.bg} /></td>
                  </tr>
                ))}
                <tr className="grid-total-row">
                  <td className="stickycol">Total</td>
                  {draft.weeks.map(w=>(<td key={w.id}><NumCell value={sizeSum(w.qty)} editable={false} bold bg={ORDER_MGMT_COLORS.ordered.head} /></td>))}
                  <td><NumCell value={calc.totals.ordered} editable={false} bold bg={ORDER_MGMT_COLORS.ordered.head} /></td>
                  <td className="col-divider"></td>
                  {draft.pos.map(p=>(<td key={p.id}><NumCell value={sizeSum(p.received)} editable={false} bold bg={ORDER_MGMT_COLORS.poQty.head} /></td>))}
                  <td><NumCell value={calc.totals.received} editable={false} bold bg={ORDER_MGMT_COLORS.poQty.head} /></td>
                  <td><NumCell value={calc.totals.balanceToOrder} editable={false} bold color={balColor(calc.totals.balanceToOrder)} /></td>
                  <td><NumCell value={calc.totals.fgStock} editable={false} bold bg={ORDER_MGMT_COLORS.fgStock.head} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="acc-subhead">
            <span>Factory Issue &amp; Stock Tracking</span>
            <button className="add-col-btn" onClick={addIssue}>+ Add order batch</button>
          </div>
          <div className="table-scroll">
            <table className="grid-table">
              <thead>
                <tr>
                  <th className="stickycol lbl">Size</th>
                  <th style={{background:ORDER_MGMT_COLORS.ordered.head}}>Ordered Qty</th>
                  <th className="col-divider"></th>
                  {draft.issues.map(is=>(
                    <th key={is.id} style={{background:ORDER_MGMT_COLORS.issued.head}}>
                      <input className="col-head-label" value={is.label} onChange={e=>setIssueLabel(is.id,e.target.value)} />
                      <span className="icon-btn" onClick={()=>removeIssue(is.id)} style={{marginLeft:2}}>✕</span>
                    </th>
                  ))}
                  <th style={{background:ORDER_MGMT_COLORS.issued.head}}>Total Issued</th>
                  <th style={{background:ORDER_MGMT_COLORS.stockBal.head}}>Stock Balance</th>
                  <th style={{background:ORDER_MGMT_COLORS.needIssue.head}}>Need to Issue</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(size=>(
                  <tr key={size}>
                    <td className="stickycol">{size}</td>
                    <td><NumCell value={calc.orderedTotal[size]} editable={false} bold bg={ORDER_MGMT_COLORS.ordered.bg} /></td>
                    <td className="col-divider"></td>
                    {draft.issues.map(is=>(
                      <td key={is.id}><NumCell value={is.qty[size]} onChange={val=>setIssueQty(is.id,size,val)} bg={ORDER_MGMT_COLORS.issued.bg} /></td>
                    ))}
                    <td><NumCell value={calc.issuedTotal[size]} editable={false} bold bg={ORDER_MGMT_COLORS.issued.bg} /></td>
                    <td><NumCell value={calc.balanceAccStock[size]} editable={false} bold color={balColor(calc.balanceAccStock[size])} bg={ORDER_MGMT_COLORS.stockBal.bg} /></td>
                    <td><NumCell value={calc.needToIssue[size]} editable={false} bold color={balColor(-calc.needToIssue[size])} bg={ORDER_MGMT_COLORS.needIssue.bg} /></td>
                  </tr>
                ))}
                <tr className="grid-total-row">
                  <td className="stickycol">Total</td>
                  <td><NumCell value={calc.totals.ordered} editable={false} bold bg={ORDER_MGMT_COLORS.ordered.head} /></td>
                  <td className="col-divider"></td>
                  {draft.issues.map(is=>(<td key={is.id}><NumCell value={sizeSum(is.qty)} editable={false} bold bg={ORDER_MGMT_COLORS.issued.head} /></td>))}
                  <td><NumCell value={calc.totals.issued} editable={false} bold bg={ORDER_MGMT_COLORS.issued.head} /></td>
                  <td><NumCell value={calc.totals.balanceAccStock} editable={false} bold color={balColor(calc.totals.balanceAccStock)} bg={ORDER_MGMT_COLORS.stockBal.head} /></td>
                  <td><NumCell value={calc.totals.needToIssue} editable={false} bold color={balColor(-calc.totals.needToIssue)} bg={ORDER_MGMT_COLORS.needIssue.head} /></td>
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
// Password input with a show/hide toggle (eye icon) — used on the login/setup screen.
function PasswordField({value,onChange,placeholder,autoFocus}){
  const [visible,setVisible] = useState(false);
  return (
    <div style={{position:'relative'}}>
      <input type={visible?'text':'password'} value={value} onChange={onChange} placeholder={placeholder} autoFocus={autoFocus}
        style={{paddingRight:34,width:'100%',boxSizing:'border-box'}} />
      <button type="button" onClick={()=>setVisible(v=>!v)} title={visible?'Hide password':'Show password'}
        style={{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--ink-faint)',padding:4,display:'flex',alignItems:'center'}}>
        <Icon name={visible?'eyeOff':'eye'} size={15} />
      </button>
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
  const LOGIN_BACKGROUNDS = ['/login-bg-1.jpg','/login-bg-4.jpg','/login-bg-5.jpg'];
  const [bgImg] = useState(()=> LOGIN_BACKGROUNDS[Math.floor(Math.random()*LOGIN_BACKGROUNDS.length)]);

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
   <div className="login-wrap" style={{backgroundImage:`url(${bgImg})`}}>
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
            <PasswordField value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 4 characters" />
            <label>Confirm password</label>
            <PasswordField value={confirmPw} onChange={e=>setConfirmPw(e.target.value)} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="login-title">Sign in</div>
            <label>Username</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} autoFocus />
            <label>Password</label>
            <PasswordField value={password} onChange={e=>setPassword(e.target.value)} />
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

// Per-user row with its own draft for Role / Admin / Module access — nothing here reaches
// the shared account list until Save is clicked, same pattern as everywhere else in the app.
// Password changes keep their own existing explicit Save flow (passed in from the parent),
// unaffected by this.
function UserRow({u, currentUser, onChangeRole, onRemoveUser,
  pwEditId, newPassword, setNewPassword, pwError, startPwEdit, savePwEdit, setPwEditId, setPwError,
  revealedIds, toggleReveal, expandedId, setExpandedId}){
  const savedAccess = {role:u.role, isAdmin:!!u.isAdmin, moduleAccess:{...Object.fromEntries(MODULE_LIST.map(m=>[m.key,true])), ...(u.moduleAccess||{})}};
  const [draft,setDraft] = useState(savedAccess);
  const [justSaved,setJustSaved] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(savedAccess);
  const setModuleDraft = (key,checked)=> setDraft(d=>({...d, moduleAccess:{...d.moduleAccess,[key]:checked}}));
  const save = ()=>{
    onChangeRole(u.id, {role:draft.role, isAdmin:draft.isAdmin, moduleAccess:draft.moduleAccess});
    setJustSaved(true); setTimeout(()=>setJustSaved(false),1800);
  };
  const discard = ()=> setDraft(savedAccess);
  const draftModuleSummary = ()=>{
    if(draft.isAdmin) return 'All modules (admin)';
    const on = MODULE_LIST.filter(m=>draft.moduleAccess[m.key]!==false).length;
    if(on===MODULE_LIST.length) return 'All modules';
    if(on===0) return 'No modules';
    return `${on} of ${MODULE_LIST.length} modules`;
  };
  return (
    <React.Fragment>
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
          <select value={draft.role} onChange={e=>setDraft(d=>({...d,role:e.target.value}))}>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </td>
        <td>
          <input type="checkbox" checked={draft.isAdmin} onChange={e=>setDraft(d=>({...d,isAdmin:e.target.checked}))} disabled={u.id===currentUser.id} />
        </td>
        <td>
          {draft.isAdmin ? (
            <span style={{fontSize:12,color:'var(--ink-faint)'}}>{draftModuleSummary()}</span>
          ) : (
            <button type="button" className="btn" style={{fontSize:11.5,padding:'4px 10px'}} onClick={()=>setExpandedId(expandedId===u.id?null:u.id)}>
              {draftModuleSummary()} <Icon name="chevronDown" size={12} style={expandedId===u.id?{transform:'rotate(180deg)'}:undefined}/>
            </button>
          )}
        </td>
        <td style={{display:'flex',alignItems:'center',gap:6}}>
          <button type="button" className={"btn"+(dirty?" primary":"")} disabled={!dirty} onClick={save} style={{padding:'4px 10px',fontSize:11}}>Save</button>
          {dirty && <button type="button" className="btn" onClick={discard} style={{padding:'4px 8px',fontSize:11}}>Discard</button>}
          {dirty && <span className="acc-kpi-badge amber">● Unsaved</span>}
          {justSaved && !dirty && <span className="acc-kpi-badge green">✓ Saved</span>}
          {u.id!==currentUser.id && (
            <button className="icon-btn" title="Remove user"
              onClick={()=>{ if(window.confirm(`Remove ${u.displayName} (${u.username})? They will no longer be able to sign in.`)) onRemoveUser(u.id); }}>✕</button>
          )}
        </td>
      </tr>
      {expandedId===u.id && !draft.isAdmin && (
        <tr>
          <td colSpan={7} style={{background:'var(--surface-alt)'}}>
            <div style={{padding:'10px 4px',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:'6px 14px'}}>
              {MODULE_LIST.map(m=>(
                <label key={m.key} style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5}}>
                  <input type="checkbox" checked={draft.moduleAccess[m.key]!==false}
                    onChange={e=>setModuleDraft(m.key,e.target.checked)} />
                  {m.label}
                </label>
              ))}
            </div>
            {dirty && <div className="foot-note" style={{color:'var(--amber)',padding:'0 4px 8px'}}>Unsaved — click Save in the row above to keep these module changes.</div>}
          </td>
        </tr>
      )}
    </React.Fragment>
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
                <UserRow key={u.id} u={u} currentUser={currentUser} onChangeRole={onChangeRole} onRemoveUser={onRemoveUser}
                  pwEditId={pwEditId} newPassword={newPassword} setNewPassword={setNewPassword} pwError={pwError}
                  startPwEdit={startPwEdit} savePwEdit={savePwEdit} setPwEditId={setPwEditId} setPwError={setPwError}
                  revealedIds={revealedIds} toggleReveal={toggleReveal} expandedId={expandedId} setExpandedId={setExpandedId} />
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
// Detects the "Page X/Y" marker Decathlon prints near the top of every PO sheet. Returns
// {page, total} or null. Used to identify and drop continuation pages (page 2 of 2, etc.) —
// on Decathlon's PO template these only ever carry a boilerplate comments block, never any of
// the actual order data, which all lives on page 1. Some of this template's pages interleave
// unrelated text between the "X" and "/Y" parts of the marker (e.g. "Page1 / n° 2" — the "n°"
// belongs to a different field that reflows in between), so the whole page is searched as one
// blob with a gap-tolerant pattern rather than requiring the marker to sit cleanly on one line.
function extractPageOfTotal(items){
  const usable = (items||[]).filter(it=>(it.str||'').trim().length>0 && it.transform);
  if(usable.length===0) return null;
  const sorted = usable.slice().sort((a,b)=> b.transform[5]-a.transform[5] || a.transform[4]-b.transform[4]);
  const blob = sorted.map(it=>it.str).join(' ').replace(/\s+/g,' ');
  const m = blob.match(/page\s*(\d+)[^\d/]{0,15}\/[^\d]{0,10}(\d+)/i);
  if(m) return { page:Number(m[1]), total:Number(m[2]) };
  return null;
}

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

  // 3) Everything from "PO Comment" (page 2, if present) or "Please repeat on
  //    your invoice..." (page 1 — this footer repeats there too, but without a
  //    "PO Comment" line above it, so that anchor alone missed it) down to the
  //    bottom margin: comments, the "thanks to confirm…" note, order number,
  //    contact name/email, department, invoice address, VAT number, signature
  //    lines, fax id. Border kept intact. The left edge is sized to the actual
  //    leftmost text in this band rather than a fixed guessed margin — some of
  //    these lines start further left than marginX, and a fixed edge left the
  //    first letter or two of "PO Comment", "Please…", "Order Number",
  //    "Contact", "Supplier Signature", "fax id" etc. peeking out past the box.
  const repeatNote = findItem(items, 'please repeat');
  const footerAnchor = poComment || repeatNote;
  if(footerAnchor){
    const bottomMargin = 14;
    const topY = footerAnchor.transform[5] + itemHeight(footerAnchor) + 4;
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
  const isContinuationPage = [];

  for(let i=0;i<numPages;i++){
    const pjsPage = await pdfjsDoc.getPage(i+1);
    const viewport = pjsPage.getViewport({ scale: 1 });
    const textContent = await pjsPage.getTextContent();
    const rects = computeRedactionRects(textContent.items, viewport.width, viewport.height);
    poNumbers.push(extractPoNumber(textContent.items, viewport.height));
    const pageOf = extractPageOfTotal(textContent.items);
    isContinuationPage.push(!!(pageOf && pageOf.page>1));
    const libPage = pdfLibPages[i];
    rects.forEach(r=>{
      libPage.drawRectangle({ x:r.x, y:r.y, width:r.width, height:r.height, color: PDFLib.rgb(1,1,1) });
    });
    if(onProgress) onProgress(i+1, numPages);
  }

  const redactedBytes = await pdfLibDoc.save();
  return { redactedBytes, numPages, poNumbers, isContinuationPage };
}

// Renders one page of a PDF (given as bytes) to a PNG/JPEG data URL for preview
// or export. dpi controls resolution (96 for on-screen preview, 300 for export).
async function loadPdfDoc(bytes){
  return await pdfjsLib.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;
}
async function renderPdfDocPageToCanvas(doc, pageNum, dpi){
  const page = await doc.getPage(pageNum);
  const scale = dpi/72;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}
// Single ad-hoc page render (used for on-screen previews) — loads its own document since
// it's only ever called once at a time, not in a page loop.
async function renderPdfPageToDataUrl(bytes, pageNum, dpi, mime){
  const doc = await loadPdfDoc(bytes);
  const canvas = await renderPdfDocPageToCanvas(doc, pageNum, dpi);
  return { dataUrl: canvas.toDataURL(mime||'image/png', 0.92), canvas, numPages: doc.numPages };
}

// True redaction pass: rebuilds the PDF from a rasterized image of each page
// (same render pipeline as the JPEG/PNG export) so none of the original text
// objects — including the ones still sitting under the white redaction boxes —
// survive. Unlike drawing a rectangle on the vector PDF, this makes the removed
// fields genuinely unrecoverable via copy/paste or any text-extraction tool.
// The source PDF is parsed once and reused across every page — re-parsing per page was the
// real cost on multi-page files, and fixing that alone gives most of the speedup. Pages are
// encoded as PNG (not JPEG) — JPEG's block-based compression visibly breaks up thin table
// borders and hairlines, which is unacceptable for a document like this; PNG stays lossless
// and, for flat black-on-white content like a table, compresses efficiently anyway.
async function flattenPdfToRasterBytes(bytes, numPages, dpi, onProgress, isContinuationPage, poNumbers){
  const outDoc = await PDFLib.PDFDocument.create();
  const usedDpi = dpi || 300;
  const doc = await loadPdfDoc(bytes);
  let prevPoNum = null;
  for(let p=1; p<=numPages; p++){
    const poNum = poNumbers && poNumbers[p-1];
    const markedContinuation = !!(isContinuationPage && isContinuationPage[p-1]);
    const matchesPrevPoNum = !!(poNum && poNum===prevPoNum);
    if(poNum) prevPoNum = poNum;
    if(markedContinuation || matchesPrevPoNum){ if(onProgress) onProgress(p, numPages); continue; } // page 2+ of a PO — Decathlon's template only puts data on page 1
    const canvas = await renderPdfDocPageToCanvas(doc, p, usedDpi);
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

// Same approach, for a single page — used when splitting a multi-PO PDF into one file per
// PO. Accepts an already-loaded document so a full multi-page split only parses the source
// PDF once, not once per PO.
async function flattenSinglePageFromDocToRasterBytes(doc, pageNum, dpi){
  const outDoc = await PDFLib.PDFDocument.create();
  const usedDpi = dpi || 300;
  const canvas = await renderPdfDocPageToCanvas(doc, pageNum, usedDpi);
  const pngDataUrl = canvas.toDataURL('image/png');
  const pngBytes = Uint8Array.from(atob(pngDataUrl.split(',')[1]), c=>c.charCodeAt(0));
  const pngImage = await outDoc.embedPng(pngBytes);
  const pageWidthPt = canvas.width * 72 / usedDpi;
  const pageHeightPt = canvas.height * 72 / usedDpi;
  const page = outDoc.addPage([pageWidthPt, pageHeightPt]);
  page.drawImage(pngImage, { x:0, y:0, width: pageWidthPt, height: pageHeightPt });
  return await outDoc.save();
}
// Ad-hoc single-page wrapper (loads its own document) — kept for any one-off caller.
async function flattenSinglePageToRasterBytes(bytes, pageNum, dpi){
  const doc = await loadPdfDoc(bytes);
  return await flattenSinglePageFromDocToRasterBytes(doc, pageNum, dpi);
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
      originalBytes:null, redactedBytes:null, poNumbers:null, isContinuationPage:null, error:null,
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
            const { redactedBytes, numPages, poNumbers, isContinuationPage } = await redactPoPdfBytes(buf, (done,total)=>{
              setFiles(prev=>prev.map(x=>x.id===f.id?{...x,progressDone:done,progressTotal:total,numPages:total}:x));
            });
            setFiles(prev=>prev.map(x=>x.id===f.id?{...x,status:'done',originalBytes:buf,redactedBytes,numPages,poNumbers,isContinuationPage}:x));
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
      const flattenedBytes = await flattenPdfToRasterBytes(f.redactedBytes, f.numPages, 300, null, f.isContinuationPage, f.poNumbers);
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
      const doc = await loadPdfDoc(f.redactedBytes);
      let prevPoNum = null;
      let exportedCount = 0;
      for(let p=1;p<=f.numPages;p++){
        const poNum = f.poNumbers && f.poNumbers[p-1];
        // Either signal firing is enough to treat this as a continuation page: the explicit
        // "Page X/Y" marker Decathlon prints on the sheet, or (as a second, independent check)
        // this page's PO number simply repeating the previous page's.
        const markedContinuation = !!(f.isContinuationPage && f.isContinuationPage[p-1]);
        const matchesPrevPoNum = !!(poNum && poNum===prevPoNum);
        if(poNum) prevPoNum = poNum;
        if(markedContinuation || matchesPrevPoNum) continue; // page 2+ of a PO — Decathlon's template only puts data on page 1

        const canvas = await renderPdfDocPageToCanvas(doc, p, 300);
        const blob = await new Promise(res=>canvas.toBlob(res, mime, 0.95));
        const pageLabel = String(p).padStart(2,'0');
        exportedCount++;
        if(f.numPages===1){
          downloadBlob(blob, base+'_Page'+pageLabel+'.'+ext);
        }else{
          zip.file(base+'_Page'+pageLabel+'.'+ext, blob);
        }
      }
      if(f.numPages>1 && exportedCount>0){
        const zipBlob = await zip.generateAsync({ type:'blob' });
        downloadBlob(zipBlob, base+'_'+ext.toUpperCase()+'.zip');
      }
    } finally { setExporting(false); }
  }

  // Splits a multi-PO PDF into one flattened (text-removed) PDF per PO, naming each file
  // after the PO number printed at the top of that sheet (e.g. "n° 1130224857" →
  // 1130224857.pdf). Falls back to the page number for any sheet where a PO number
  // couldn't be detected. Decathlon POs only carry real line-item data on page 1 — when a
  // PO runs to a second page (e.g. "Page 2/2", just comments/signature blocks), that page
  // repeats the same PO number in its header, so it's recognised as a continuation of the
  // previous page's PO and skipped entirely, keeping only page 1 per PO. A single-page
  // file downloads directly; multi-page files are bundled as a zip. The source PDF is
  // parsed once and reused for every page.
  async function downloadEachPo(f){
    setExporting(true);
    try{
      const zip = new JSZip();
      const base = f.name.replace(/\.pdf$/i,'');
      const usedNames = new Set();
      const doc = await loadPdfDoc(f.redactedBytes);
      let prevPoNum = null;
      for(let p=1;p<=f.numPages;p++){
        const poNum = f.poNumbers && f.poNumbers[p-1];
        // Either signal firing is enough to treat this as a continuation page: the explicit
        // "Page X/Y" marker Decathlon prints on the sheet, or (as a second, independent check)
        // this page's PO number simply repeating the previous page's.
        const markedContinuation = !!(f.isContinuationPage && f.isContinuationPage[p-1]);
        const matchesPrevPoNum = !!(poNum && poNum===prevPoNum);
        if(poNum) prevPoNum = poNum;
        if(markedContinuation || matchesPrevPoNum) continue; // page 2+ of a PO — Decathlon's template only puts data on page 1

        const bytes = await flattenSinglePageFromDocToRasterBytes(doc, p, 300);
        const blob = new Blob([bytes], { type:'application/pdf' });
        const nameBase = poNum ? poNum : (base+'_Page'+String(p).padStart(2,'0'));
        let name = nameBase, n = 2;
        while(usedNames.has(name)){ name = nameBase+'_'+n; n++; } // guard against duplicate PO numbers
        usedNames.add(name);
        if(f.numPages===1){
          downloadBlob(blob, name+'.pdf');
        }else{
          zip.file(name+'.pdf', blob);
        }
      }
      if(zip.file(/.*/).length>0){
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
                from the top of each sheet (the "n° ..." line) to name the file — e.g. <span className="mono">1130224857.pdf</span>.
                If a PO runs to a second page (e.g. a comments/signature page with no line items), that page is skipped automatically — only page 1 of each PO is kept.
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
    { username:'Bharath', password:'12345', displayName:'Bharath', role:'editor', isAdmin:true },
    { username:'Globe1', password:'12345', displayName:'Globe', role:'editor', isAdmin:false,
      moduleAccess:{ dashboard:false, seasonnames:false, weeklyimport:false, yarnreq:false, fabricreq:false, accessories:false, forecast:false, firmorders:false, comparison:false, ordermgmt:false, shipmentmgmt:false, shipmentperf:false, podocedit:true } },
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
  const [selectionMappings,setSelectionMappings] = useState({});
  const [fabricLines,setFabricLines] = useState([]);
  const [seasonNames,setSeasonNames] = useState([]);
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
  const [parsingShipmentDetailsSheet,setParsingShipmentDetailsSheet] = useState(false);
  const [shipmentDetailsSheetError,setShipmentDetailsSheetError] = useState(null);

  useEffect(()=>{
    (async ()=>{
      // The code (DEFAULT_USERS_SEED) is always the source of truth for who can log in and
      // with what password — this browser's local copy is re-synced from it on every load,
      // so pushing an updated password/user list always reaches everyone, not just browsers
      // that have never opened the app before. Using the "Add user" / password-pencil
      // buttons in the running app only changes THIS browser's local copy and will be
      // overwritten the next time the page loads — edit DEFAULT_USERS_SEED and redeploy
      // instead for any change that needs to reach your teammates.
      const users = DEFAULT_USERS_SEED.length>0 ? await seedDefaultUsers() : ((await storeGet('app-users',true)) || []);
      await storeSet('app-users', users, true);
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
      const selMap = await storeGet('selection-mappings',true);
      const fLines = await storeGet('fabric-lines',true);
      const seasons = await storeGet('season-names',true);
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
      if(selMap) setSelectionMappings(selMap);
      if(fLines) setFabricLines(fLines);
      if(seasons) setSeasonNames(seasons);
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
  // (matched by Style Number, falling back to Iman/Model Code), with the fields the admin
  // mapped in the column-mapping step. The season selected in the upload UI is authoritative
  // for every row, regardless of what a "Season" column inside the file might say. The
  // confirmed mapping is saved per season (with the header text at each index) so next
  // season's re-upload can validate and reuse it, or fall back to a fresh guess if the
  // layout changed.
  const handleSelectionUpload = useCallback(async (grid, headerRowIdx, mapping, headerRow, sourceLabel, season, remarks)=>{
    setParsingSelection(true);
    try{
      const batch = parseSelectionRowsFromGrid(grid, sourceLabel, headerRowIdx, mapping);
      batch.rows.forEach(row=>{ row.season = season; });
      const rekeyMap = {}; // oldStyleNo -> newStyleNo, for any style healed onto its correct key below
      setAccessoryStyles(prev=>{
        const byStyleNo = {}; const byR3Code = {};
        prev.forEach(s=>{ byStyleNo[s.styleNo]=s; if(s.r3Code) byR3Code[s.r3Code]=s; });
        batch.rows.forEach(row=>{
          // Match on styleNo first, but fall back to Model Code (r3Code) — a style created
          // before the identity-key fix can still be sitting under its old key even though its
          // Model Code is unambiguously this same row. Falling back to r3Code here means a
          // re-upload heals that style onto the correct key instead of creating a second,
          // parallel duplicate record next to the stale one.
          const existing = byStyleNo[row.styleNo] || (row.r3Code && byR3Code[row.r3Code]);
          if(existing && existing.styleNo!==row.styleNo){
            rekeyMap[existing.styleNo] = row.styleNo;
            delete byStyleNo[existing.styleNo];
            existing.styleNo = row.styleNo;
            byStyleNo[existing.styleNo] = existing;
          }
          // A re-upload is authoritative for any field that WAS actually mapped in THIS upload —
          // including a numeric field that genuinely re-imports as 0, since silently keeping an
          // old value there is exactly what caused Selection Qty to look like it "wasn't
          // collecting" after a date-only refresh. But a field that wasn't mapped at all in this
          // particular file (e.g. this version's mapping screen came back "Not in this file" for
          // SMT Dyed, even if an earlier upload had it right) must NOT silently zero out
          // previously-good data — that's a different bug with the same symptom (a number
          // going to 0) but the opposite fix: keep the old value instead of trusting this row.
          // mapping[field]>=0 is the actual signal for "this file had that column", which a raw
          // value of 0 can never distinguish on its own.
          const keepOrOverwrite = (field, rowVal, existingVal) => (mapping[field]>=0) ? rowVal : existingVal;
          if(existing){
            Object.assign(existing, {
              season:row.season||existing.season, buyer:keepOrOverwrite('buyer',row.buyer,existing.buyer),
              description:keepOrOverwrite('description',row.description,existing.description), color:keepOrOverwrite('color',row.color,existing.color),
              factory:keepOrOverwrite('factory',row.factory,existing.factory), country:keepOrOverwrite('country',row.country,existing.country),
              company:keepOrOverwrite('company',row.company,existing.company), supplier:keepOrOverwrite('supplier',row.supplier,existing.supplier),
              department:keepOrOverwrite('department',row.department,existing.department), cc:keepOrOverwrite('cc',row.cc,existing.cc),
              brand:keepOrOverwrite('brand',row.brand,existing.brand),
              rsCode:keepOrOverwrite('styleNo',row.rsCode,existing.rsCode),
              selectionQty: keepOrOverwrite('selectionQty',row.selectionQty,existing.selectionQty),
              r3Code: keepOrOverwrite('r3Code',row.r3Code,existing.r3Code),
              yarnSmtPct: keepOrOverwrite('yarnSmtPct',row.yarnSmtPct,existing.yarnSmtPct),
              fabricGreigeSmtPct: keepOrOverwrite('fabricGreigeSmtPct',row.fabricGreigeSmtPct,existing.fabricGreigeSmtPct),
              fabricDyingSmtPct: keepOrOverwrite('fabricDyingSmtPct',row.fabricDyingSmtPct,existing.fabricDyingSmtPct),
              accSmtPct: keepOrOverwrite('accSmtPct',row.accSmtPct,existing.accSmtPct),
              newOrRec: keepOrOverwrite('newOrRec',row.newOrRec,existing.newOrRec),
              totalCommitmentQty: keepOrOverwrite('totalCommitmentQty',row.totalCommitmentQty,existing.totalCommitmentQty),
              implantationCddWeek: keepOrOverwrite('implantationCddWeek',row.implantationCddWeek,existing.implantationCddWeek),
              lastCddWeek: keepOrOverwrite('lastCddWeek',row.lastCddWeek,existing.lastCddWeek),
              mtpPerFg: keepOrOverwrite('mtpPerFg',row.mtpPerFg,existing.mtpPerFg),
              mtpXQty: keepOrOverwrite('mtpXQty',row.mtpXQty,existing.mtpXQty),
              fob: keepOrOverwrite('fob',row.fob,existing.fob),
              costPlus: keepOrOverwrite('costPlus',row.costPlus,existing.costPlus),
              selectionTo: keepOrOverwrite('selectionTo',row.selectionTo,existing.selectionTo),
              ttlStocks: keepOrOverwrite('ttlStocks',row.ttlStocks,existing.ttlStocks),
            });
          } else {
            const id = 'st_'+Date.now()+'_'+row.styleNo;
            byStyleNo[row.styleNo] = {
              id, styleNo:row.styleNo, description:row.description, r3Code:row.r3Code, selectionQty:row.selectionQty,
              ...blankStyleMeta(),
              season:row.season, buyer:row.buyer, color:row.color, factory:row.factory, country:row.country,
              company:row.company, supplier:row.supplier, department:row.department, cc:row.cc, brand:row.brand, rsCode:row.rsCode,
              yarnSmtPct:row.yarnSmtPct, fabricGreigeSmtPct:row.fabricGreigeSmtPct, fabricDyingSmtPct:row.fabricDyingSmtPct, accSmtPct:row.accSmtPct,
              newOrRec:row.newOrRec, totalCommitmentQty:row.totalCommitmentQty,
              implantationCddWeek:row.implantationCddWeek, lastCddWeek:row.lastCddWeek,
              mtpPerFg:row.mtpPerFg, mtpXQty:row.mtpXQty, fob:row.fob, costPlus:row.costPlus,
              selectionTo:row.selectionTo, ttlStocks:row.ttlStocks,
              weeks:[{id:'wk_'+Date.now(),label:'WK01',qty:zeroSizes()}], pos:[], fgStock:zeroSizes(), issues:[],
            };
          }
          if(row.r3Code) byR3Code[row.r3Code] = byStyleNo[row.styleNo];
        });
        const next = Object.values(byStyleNo);
        storeSet('accessory-styles',next,true);
        return next;
      });
      if(Object.keys(rekeyMap).length){
        setFabricLines(prev=>{
          const next = prev.map(l=> rekeyMap[l.styleNo] ? {...l, styleNo:rekeyMap[l.styleNo]} : l);
          storeSet('fabric-lines', next, true);
          return next;
        });
      }
      setSelectionBatches(prev=>{
        const version = prev.filter(b=>b.season===season).length + 1;
        const next=[...prev,{
          id:batch.id, fileName:batch.fileName, uploadedAt:batch.uploadedAt, rowCount:batch.rowCount,
          season, version, uploadedBy: currentUser? currentUser.displayName : '', remarks: remarks||'', rows: batch.rows,
        }];
        storeSet('selection-batches',next,true);
        return next;
      });
      setSelectionMappings(prev=>{
        const headers = {};
        SELECTION_MAPPING_FIELDS.forEach(f=>{ headers[f.key] = mapping[f.key]>=0 ? headerRow[mapping[f.key]] : null; });
        const next = {...prev, [season]: {indexes:mapping, headers}};
        storeSet('selection-mappings', next, true);
        return next;
      });
    }catch(e){ alert('Could not parse this file: '+e.message); }
    setParsingSelection(false);
  },[currentUser]);

  // Fabric Requirement — EMBEE's own Fabric Ordering tracker. Each upload adds its rows as new
  // fabric lines (rather than merging into existing ones) since the same style/fabric can
  // legitimately appear again week to week as ordering/shipment progress is updated by hand;
  // stale lines are removed manually from the table instead of being auto-replaced.
  // Season Names — a managed list feeding the Season dropdown/suggestions on Selection File
  // and future modules, so seasons can be defined once ahead of time instead of retyped per upload.
  const handleAddSeasonName = useCallback((name)=>{
    const clean = String(name||'').trim().toUpperCase();
    if(!clean) return;
    setSeasonNames(prev=>{
      if(prev.includes(clean)) return prev;
      const next = [...prev, clean];
      storeSet('season-names', next, true);
      return next;
    });
  },[]);
  const handleRemoveSeasonName = useCallback((name)=>{
    setSeasonNames(prev=>{
      const next = prev.filter(s=>s!==name);
      storeSet('season-names', next, true);
      return next;
    });
  },[]);

  const handleUpdateFabricLine = useCallback((id, patch)=>{
    setFabricLines(prev=>{
      const next = prev.map(l=>l.id===id? {...l,...patch} : l);
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  const handleDeleteFabricLine = useCallback((id)=>{
    setFabricLines(prev=>{
      const next = prev.filter(l=>l.id!==id);
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  const handleDeleteManyFabricLines = useCallback((ids)=>{
    const idSet = new Set(ids);
    setFabricLines(prev=>{
      const next = prev.filter(l=>!idSet.has(l.id));
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  const handleAddFabricLine = useCallback((season, styleNo)=>{
    setFabricLines(prev=>{
      const next = [...prev, blankFabricLine2(season, styleNo)];
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  const handleAddManyFabricLines = useCallback((lines)=>{
    setFabricLines(prev=>{
      const next = [...prev, ...lines];
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  const handleDuplicateFabricLine = useCallback((id)=>{
    setFabricLines(prev=>{
      const idx = prev.findIndex(l=>l.id===id);
      if(idx<0) return prev;
      const clone = {...prev[idx], id:'fl_'+Date.now()+'_'+Math.random().toString(36).slice(2,7)};
      const next = [...prev.slice(0,idx+1), clone, ...prev.slice(idx+1)];
      storeSet('fabric-lines', next, true);
      return next;
    });
  },[]);
  // One-time cleanup for the fallout of the identity-key fix (Model Code became the unique
  // style identity instead of Style Number/RS): any style imported before that fix can be
  // sitting in accessoryStyles as an orphaned duplicate of the correctly-keyed record created
  // since, and any Fabric/Yarn/Accessories line still pointing at the orphan never sees edits
  // made to the correct one — exactly the "I updated it but it's not taking" symptom. This
  // groups styles by Model Code (falling back to Style Number when Model Code is blank), keeps
  // the most complete record in each group as the survivor, drops the rest, and repoints every
  // fabric line from a dropped duplicate's key onto the survivor's key so nothing goes orphaned.
  const handleMergeDuplicateStyles = useCallback(()=>{
    let survivorFor = {}; let mergedCount = 0;
    setAccessoryStyles(prevStyles=>{
      const groups = {};
      prevStyles.forEach(s=>{
        const gk = (s.season||'')+'|'+((s.r3Code&&s.r3Code.trim())? 'R:'+s.r3Code.trim() : 'S:'+s.styleNo);
        (groups[gk]=groups[gk]||[]).push(s);
      });
      const survivors = [];
      Object.values(groups).forEach(group=>{
        if(group.length===1){ survivorFor[group[0].styleNo]=group[0].styleNo; survivors.push(group[0]); return; }
        mergedCount += group.length-1;
        const scoreOf = s => Object.values(s).filter(v=>v!==''&&v!=null&&v!==0).length;
        const [survivor,...dupes] = [...group].sort((a,b)=>scoreOf(b)-scoreOf(a));
        dupes.forEach(d=>{ survivorFor[d.styleNo]=survivor.styleNo; });
        survivorFor[survivor.styleNo]=survivor.styleNo;
        survivors.push(survivor);
      });
      storeSet('accessory-styles', survivors, true);
      return survivors;
    });
    setFabricLines(prevLines=>{
      const next = prevLines.map(l=> (survivorFor[l.styleNo] && survivorFor[l.styleNo]!==l.styleNo) ? {...l, styleNo:survivorFor[l.styleNo]} : l);
      storeSet('fabric-lines', next, true);
      return next;
    });
    setTimeout(()=> alert(mergedCount>0 ? `Merged ${mergedCount} duplicate style record(s) and relinked any fabric lines that pointed at them.` : 'No duplicate styles found — nothing to merge.'), 0);
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
  // Shipment Details — import directly from a Google Sheet link instead of downloading and
  // re-uploading a file. Same 3-step fetch strategy already proven for shipment booking:
  // try a published CSV link as-is, then the full-workbook export link, then Google's
  // Visualization API (most reliable for cross-origin access, but only one tab per call).
  const handleShipmentDetailsSheetImport = useCallback(async (url, sheetNameFilter, weekDate)=>{
    setParsingShipmentDetailsSheet(true);
    setShipmentDetailsSheetError(null);
    try{
      let batch = null;

      if(/output=csv|\/pub\b/.test(url)){
        try{
          const res = await fetch(url);
          if(res.ok){
            const csvText = await res.text();
            if(!/^\s*<!doctype html|^\s*<html/i.test(csvText)){
              const wb = XLSX.read(csvText, {type:'string'});
              batch = parseShipmentDetailsWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, weekDate);
            }
          }
        }catch(e0){ /* fall through */ }
      }

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
            batch = parseShipmentDetailsWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, weekDate);
          }
        }catch(e1){ /* fall through to attempt 2 below — usually a CORS block on the export link */ }
      }

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
        batch = parseShipmentDetailsWorkbook(wb, `Google Sheet — ${new Date().toLocaleDateString()}`, weekDate);
      }

      setShipmentDetailsBatches(prev=>{
        const next=[...prev,batch];
        storeSet('shipmentdetails-batches',next,true);
        return next;
      });
    }catch(e){ setShipmentDetailsSheetError(e.message); }
    setParsingShipmentDetailsSheet(false);
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
  // Removes selected rows from just this upload/batch's view — deliberately does NOT touch
  // accessoryStyles or any Fabric/Yarn/Accessories Requirement data, since a style used
  // downstream shouldn't vanish out from under those pages just because its Selection File row
  // was removed from one particular upload's display.
  const handleDeleteSelectionRows = useCallback((batchId, rowIndexes)=>{
    const idxSet = new Set(rowIndexes);
    setSelectionBatches(prev=>{
      const next = prev.map(b=>{
        if(b.id!==batchId) return b;
        const rows = b.rows.filter((r,i)=>!idxSet.has(i));
        return {...b, rows, rowCount: rows.length};
      });
      storeSet('selection-batches',next,true);
      return next;
    });
  },[]);
  // Manual save from the Selection File "Viewing" table's Edit mode — nothing here fires on
  // blur/keystroke; the table only ever collects edits into a local draft, and this is called
  // once, only when the person clicks Save, with every changed cell for that batch at once. It
  // updates the uploaded batch's row (so re-opening Viewing shows the corrected value, not the
  // original file's) AND the live style record every downstream page (Fabric/Yarn/Accessories
  // Requirement, Demands, Dashboard) actually reads from, matched the same way import does:
  // Style Number, falling back to Iman/Model Code. Numeric fields coerce the same way the
  // importer does, so a manual edit and a re-upload always behave the same.
  const SELECTION_NUMERIC_FIELDS = ['selectionQty','yarnSmtPct','fabricGreigeSmtPct','fabricDyingSmtPct','accSmtPct',
    'totalCommitmentQty','mtpPerFg','mtpXQty','fob','costPlus','ttlStocks'];
  const handleSaveSelectionEdits = useCallback((batchId, edits)=>{
    // edits: [{rowIndex, changes:{field:rawValue,...}}, ...] — one entry per row that has at
    // least one changed cell, gathered by the table while the person was editing.
    if(!edits || !edits.length) return;
    const coerce = (field,v)=> SELECTION_NUMERIC_FIELDS.includes(field) ? (Number(v)||0) : String(v);
    let editedRows = [];
    setSelectionBatches(prev=>{
      const next = prev.map(b=>{
        if(b.id!==batchId) return b;
        const rows = b.rows.map((r,i)=>{
          const e = edits.find(x=>x.rowIndex===i);
          if(!e) return r;
          const changes = {}; Object.entries(e.changes).forEach(([f,v])=>{ changes[f]=coerce(f,v); });
          const merged = {...r, ...changes};
          editedRows.push(merged);
          return merged;
        });
        return {...b, rows};
      });
      storeSet('selection-batches',next,true);
      return next;
    });
    if(!editedRows.length) return;
    // This list must cover every editable column in SELECTION_RAW_TABLE_COLUMNS — a field left
    // out here can be edited and "saved" in the Viewing table (which only writes to the batch,
    // so the edit looks like it worked there) while silently never reaching accessoryStyles,
    // the record every downstream page (Fabric/Yarn/Accessories Requirement) actually reads
    // from. That exact gap is what made SMT Yarn/SMT Dyed edits invisible to Fabric Requirement
    // after the Viewing table was expanded to show them as editable — this list hadn't been
    // updated to match.
    const editableFields = ['company','buyer','rsCode','department','brand','cc','description','r3Code',
      'newOrRec','selectionQty','totalCommitmentQty','implantationCddWeek','lastCddWeek','fob','costPlus',
      'yarnSmtPct','fabricGreigeSmtPct','fabricDyingSmtPct','accSmtPct','mtpPerFg','mtpXQty',
      'selectionTo','ttlStocks','color','factory'];
    setAccessoryStyles(prev=>{
      const next = prev.map(s=>{
        // Match on Model Code (r3Code) OR the identity key (styleNo) — not just one. A style
        // created before the identity-key fix can still have its OLD key stored (e.g. its
        // styleNo field literally holds the old RS-based value), even though its r3Code is
        // unambiguously the same real style as the row being edited. Requiring only a styleNo
        // match was exactly why an edit could update Selection File's own display correctly
        // while silently missing an older-keyed style record — Fabric/Yarn/Accessories
        // Requirement would keep reading the untouched one. Matching on either field closes
        // that gap without needing a manual "merge duplicates" cleanup after every edit.
        const match = editedRows.find(r=>
          (s.styleNo && r.styleNo && r.styleNo===s.styleNo) ||
          (s.r3Code && r.r3Code && r.r3Code===s.r3Code)
        );
        if(!match) return s;
        const patch = {}; editableFields.forEach(f=>{ patch[f]=match[f]; });
        return {...s, ...patch};
      });
      storeSet('accessory-styles',next,true);
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
    seasonnames:{title:'Season Names',sub:'Define each season once — feeds every season picker in the app'},
    weeklyimport:{title:'Selection File',sub:'Season-wise selection upload — the starting point of planning'},
    yarnreq:{title:'Yarn Requirement',sub:'Consumption, wastage/extra % and ordering — coming soon'},
    fabricreq:{title:'Fabric Requirement',sub:'Consumption, requirement, stock netting, ordering & shipment tracking'},
    accessories:{title:'Accessories Requirement',sub:'Delivery-wise priority planning grid'},
    forecast:{title:'Forecast',sub:'Weekly forecast import & revision history'},
    firmorders:{title:'Firm Orders',sub:'Weekly PO import from Decathlon'},
    comparison:{title:'Forecast vs Firm',sub:'Automatic comparison engine'},
    ordermgmt:{title:'Order Management',sub:'Delivery-wise priority planning grid & PO tracking'},
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
          {NAV_GROUPS.map(group=>{
            const visibleKeys = group.keys.filter(key=>hasModuleAccess(currentUser,key));
            if(!visibleKeys.length) return null;
            return (
              <React.Fragment key={group.label}>
                <div className="nav-section-label">{group.label}</div>
                {visibleKeys.map(key=>(
                  <div key={key} className={"nav-item"+(page===key?" active":"")} onClick={()=>setPage(key)}>
                    <Icon name={PAGE_ICONS[key]||'box'} size={17} />
                    <span className="nav-label">{pages[key].title}</span>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
          {currentUser.isAdmin && (
            <React.Fragment>
              <div className="nav-section-label">Admin</div>
              <div className={"nav-item"+(page==='users'?" active":"")} onClick={()=>setPage('users')}>
                <Icon name={PAGE_ICONS.users} size={17} />
                <span className="nav-label">{pages.users.title}</span>
              </div>
            </React.Fragment>
          )}
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
          {page==='seasonnames' && <SeasonNamesPage seasonNames={seasonNames} onAdd={handleAddSeasonName} onRemove={handleRemoveSeasonName} currentUser={currentUser}
            selectionBatches={selectionBatches} onImport={handleSelectionUpload} parsingSelection={parsingSelection} onDeleteSelection={handleDeleteSelectionBatch} onSaveSelectionEdits={handleSaveSelectionEdits} onDeleteSelectionRows={handleDeleteSelectionRows} savedMappings={selectionMappings}
            fabricLines={fabricLines} onUpdateFabricLine={handleUpdateFabricLine} onDeleteFabricLine={handleDeleteFabricLine} onDeleteManyFabricLines={handleDeleteManyFabricLines}
            onAddFabricLine={handleAddFabricLine} onAddManyFabricLines={handleAddManyFabricLines} onDuplicateFabricLine={handleDuplicateFabricLine} onMergeDuplicateStyles={handleMergeDuplicateStyles}
            accessoryStyles={accessoryStyles} setAccessoryStyles={setAccessoryStyles} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches}
          />}
          {page==='forecast' && <ForecastPage batches={forecastBatches} onUpload={handleForecastUpload} parsing={parsingForecast} onDelete={handleDeleteForecastBatch} />}
          {page==='firmorders' && <FirmOrderPage batches={firmOrderBatches} onUpload={handleFirmOrderUpload} parsing={parsingFirm} onDelete={handleDeleteFirmOrderBatch} />}
          {page==='comparison' && <ComparisonPage comparison={comparison} hasData={forecastBatches.length>0} />}
          {page==='ordermgmt' && <AccessoriesPage styles={accessoryStyles} setStyles={setAccessoryStyles} firmOrderBatches={firmOrderBatches} shipmentBatches={shipmentBatches} />}
          {page==='shipmentmgmt' && <ShipmentManagementPage invoices={invoiceRecords} onFiles={handleInvoiceUpload} parsing={parsingInvoices} onDelete={handleDeleteInvoice} skippedNote={invoiceSkippedNote} />}
          {page==='shipmentperf' && <ShipmentPerformancePage
            planBatches={shipmentPlanBatches} onPlanUpload={handleShipmentPlanUpload} parsingPlan={parsingShipmentPlan} onDeletePlan={handleDeleteShipmentPlanBatch}
            detailsBatches={shipmentDetailsBatches} onDetailsUpload={handleShipmentDetailsUpload} parsingDetails={parsingShipmentDetails} onDeleteDetails={handleDeleteShipmentDetailsBatch}
            onDetailsSheetImport={handleShipmentDetailsSheetImport} parsingDetailsSheet={parsingShipmentDetailsSheet} detailsSheetError={shipmentDetailsSheetError}
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
