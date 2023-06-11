(function () {
  const g_appid = 'bonds_';
  
  const g_brok = {
    "1": {
      "id": 1,
      "name": "Брокер 1"
    },
    "2": {
      "id": 2,
      "name": "Брокер 2"
    },
    "3": {
      "id": 3,
      "name": "Брокер 3"
    },
    "4": {
      "id": 4,
      "name": "Брокер 4"
    },
  }
  
  var g_emitents_ui = null;
  var g_checked_ui = null;
  var g_bonds_ui = null;
  var g_mybonds = {}
/**
  var g_mybonds = {
    "1": {  //brok_id
        "0_RU000A102ZT7": {
          "acc": "0",
          "secid": "RU000A102ZT7",
          "name":"БДеньги-02",
          "count":60,
          "price":96.13,
          "income":17.8,
          "curincome":16.53,
          "emitent_id": 1374877,
        },
    }
  }
**/
  var g_checked = {}
/**
  var g_checked = {
    "RU000A102ZT7": { 
        "secid": "RU000A102ZT7",
        "comment": ""
    }

  }
**/

  var g_brok1_ui = null;
  var g_brok2_ui = null;
  var g_brok3_ui = null;
  var g_brok4_ui = null;
  
  var g_tb_proc_emi_ui = null;

  DOM.ready(() =>
  {
    DOM.iSel("run_btn").onclick = (e) =>{ load_data(); }; 
    DOM.iSel("save_btn").onclick = (e) =>{ if (g_bonds_ui) g_bonds_ui.save_CSV(); }; 
    DOM.iSel("save_emi").onclick = (e) =>{ if (g_emitents_ui) g_emitents_ui.save_emi_json(); }; 
    DOM.iSel("save_mybonds").onclick = (e) =>{ save_mybonds_json(); }; 
    DOM.iSel("save_checked").onclick = (e) =>{ if (g_checked_ui) g_checked_ui.save_checked_json(); }; 

    DOM.iSel("checked_refresh").onclick = (e) =>{ if (g_checked_ui) g_checked_ui.refresh(); }; 
    DOM.iSel("checked_row_del").onclick = (e) =>{ if (g_checked_ui) g_checked_ui.row_del_ui(); }; 

    DOM.iSel("brok1_row_del").onclick = (e) =>{ if (g_brok1_ui) g_brok1_ui.row_del_ui(); }; 
    DOM.iSel("brok1_row_add").onclick = (e) =>{ if (g_brok1_ui) g_brok1_ui.row_add_ui(); }; 
    DOM.iSel("brok2_row_del").onclick = (e) =>{ if (g_brok2_ui) g_brok2_ui.row_del_ui(); }; 
    DOM.iSel("brok2_row_add").onclick = (e) =>{ if (g_brok2_ui) g_brok2_ui.row_add_ui(); }; 
    DOM.iSel("brok3_row_del").onclick = (e) =>{ if (g_brok3_ui) g_brok3_ui.row_del_ui(); }; 
    DOM.iSel("brok3_row_add").onclick = (e) =>{ if (g_brok3_ui) g_brok3_ui.row_add_ui(); }; 
    DOM.iSel("brok4_row_del").onclick = (e) =>{ if (g_brok4_ui) g_brok4_ui.row_del_ui(); }; 
    DOM.iSel("brok4_row_add").onclick = (e) =>{ if (g_brok4_ui) g_brok4_ui.row_add_ui(); }; 

    DOM.qSel('#emi_data').onchange = async (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];

        if (file) {
          const str = await loadTextFile(file);
          if (g_emitents_ui) {
            try {
              const data = await g_emitents_ui.load_emi(str);
              await g_emitents_ui.load(data);
            } catch(e) {
              console.log(e);
            }
          }
        }
      }
    };
    DOM.qSel('#mybonds_data').onchange = async (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];

        if (file) {
          const str = await loadTextFile(file);
            try {
              var data_ok = false;
              const json = JSON.parse(str);
              var keys = Object.keys(json);
              if (keys.length > 0) {
                var br_data = json[keys[0]];
                keys = Object.keys(br_data);
                if (keys.length > 0) {
                  var row_len = 0;
                  var data = br_data[keys[0]];
                  if (data['acc']!=null)
                    row_len++;
                  if (data['secid']!=null)
                    row_len++;
                  if (data['name']!=null)
                    row_len++;
                  if (row_len >= 3)
                    data_ok = true;
                }
                if (data_ok) {
                  localStorage.setItem(g_appid+'_mybonds', str);
                  location.reload();
                }

              }
            } catch(e) {
              console.log(e);
            }
        }
      }
    };


    $('a.bond-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_bonds_ui) {
        const colNum = $(this).attr('data-column');
        g_bonds_ui.toggle_col(colNum);
      }
    });
    $('a.checked-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_checked_ui) {
        const colNum = $(this).attr('data-column');
        g_checked_ui.toggle_col(colNum);
      }
    });
    $('a.brok1-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_brok1_ui) {
        const colNum = $(this).attr('data-column');
        g_brok1_ui.toggle_col(colNum);
      }
    });
    $('a.brok2-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_brok2_ui) {
        const colNum = $(this).attr('data-column');
        g_brok2_ui.toggle_col(colNum);
      }
    });

    $('a.brok3-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_brok3_ui) {
        const colNum = $(this).attr('data-column');
        g_brok3_ui.toggle_col(colNum);
      }
    });

    $('a.brok4-toggle-vis').on('click', function (e) {
      e.preventDefault();

      if (g_brok4_ui) {
        const colNum = $(this).attr('data-column');
        g_brok4_ui.toggle_col(colNum);
      }
    });


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });
    
    init_tables();
  });


  async function init_tables()
  {
    g_checked = load_checked_bonds();

    g_emitents_ui = new Emitents_Table();
    g_emitents_ui.use_selected = true;
    g_emitents_ui.use_edit = true;
    await g_emitents_ui.init_table();

    g_checked_ui = new CheckedBonds_Table();
    g_checked_ui.use_selected = true;
    g_checked_ui.use_edit = true;
    await g_checked_ui.init_table();

    g_bonds_ui = new Bonds_Table();
    g_bonds_ui.use_selected = true;
    g_bonds_ui.use_edit = true;
    await g_bonds_ui.init_table();

    g_brok1_ui = new MyBonds_brok1();
    g_brok1_ui.use_selected = true;
    g_brok1_ui.use_edit = true;
    await g_brok1_ui.init_table();

    g_brok2_ui = new MyBonds_brok2();
    g_brok2_ui.use_selected = true;
    g_brok2_ui.use_edit = true;
    await g_brok2_ui.init_table();

    g_brok3_ui = new MyBonds_brok3();
    g_brok3_ui.use_selected = true;
    g_brok3_ui.use_edit = true;
    await g_brok3_ui.init_table();

    g_brok4_ui = new MyBonds_brok4();
    g_brok4_ui.use_selected = true;
    g_brok4_ui.use_edit = true;
    await g_brok4_ui.init_table();

    g_tb_proc_emi_ui = new Proc_Emi_Table();
    g_tb_proc_emi_ui.use_selected = true;
    await g_tb_proc_emi_ui.init_table();
  }

  async function load_data()
  {
    const income_from = DOM.iSel("c_income_from").value;
    const income_to = DOM.iSel("c_income_to").value;
    const price_from = DOM.iSel("c_price_from").value;
    const price_to = DOM.iSel("c_price_to").value;
    const duration_from = DOM.iSel("c_duration_from").value * 30;
    const duration_to = DOM.iSel("c_duration_to").value * 30;
    const vcount = DOM.iSel("c_count").value;

    var bonds = [];

    try {
      if (g_bonds_ui)
        g_bonds_ui.clear();


      DOM.qShow('#run_wait');
//      DOM.iSel('run_btn').disabled = true;

      //??for (const t of ['TQOB', 'TQCB', 'TQIR']) { // https://iss.moex.com/iss/engines/stock/markets/bonds/boards/
      for (const t of [7, 58, 193]) { // https://iss.moex.com/iss/engines/stock/markets/bonds/boardgroups/

// НКД  ACCRUEDINT
// Погашение MATDATE

            //??const url = 'https://iss.moex.com/iss/engines/stock/markets/bonds/boards/' + t + '/securities.json?iss.dp=comma&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,BOARDID,SHORTNAME,COUPONVALUE,NEXTCOUPON,ACCRUEDINT,MATDATE,COUPONPERIOD,CURRENCYID,COUPONPERCENT,SECNAME,PREVLEGALCLOSEPRICE&marketdata.columns=SECID,YIELD,DURATION'
            const url = 'https://iss.moex.com/iss/engines/stock/markets/bonds/boardgroups/' + t + '/securities.json?iss.dp=comma&iss.meta=off&iss.only=securities,marketdata&securities.columns=SECID,BOARDID,SHORTNAME,COUPONVALUE,NEXTCOUPON,ACCRUEDINT,MATDATE,COUPONPERIOD,CURRENCYID,COUPONPERCENT,SECNAME,PREVLEGALCLOSEPRICE&marketdata.columns=SECID,YIELD,DURATION'
            console.log('Ссылка поиска всех доступных облигаций группы: %s', url)

            const rc = await fetch(url);
            if (rc.ok) {
              const v = await rc.json();
              const list = v.securities.data;
              console.log(`Всего в списке: ${list.length} бумаг.`)
              // marketdata SECID, YIELD, DURATION
              // securities SECID, SECNAME, PREVLEGALCLOSEPRICE

              const b_sec = new ColIndex(v.securities)
              const b_market = new ColIndex(v.marketdata)

              for(var i=0; i < list.length; i++) {
                const secid = b_sec.val(i, 'SECID');
                const bondName = b_sec.val(i, 'SECNAME').replaceAll('"','').replaceAll("'",'');
                const bondPrice = b_sec.val(i, 'PREVLEGALCLOSEPRICE');

                const bondIncome = b_market.val(i, 'YIELD');
//                const bondDuration = Math.floor(b_market.val(i, 'DURATION') / 30 * 100 / 100);
                const bondDuration = b_market.val(i, 'DURATION'); 

                const boardID = b_sec.val(i, 'BOARDID'); 
                const bondSName = b_sec.val(i, 'SHORTNAME');

                const couponVal = b_sec.val(i, 'COUPONVALUE');
                const couponNext = b_sec.val(i, 'NEXTCOUPON');
                const couponPeriod = b_sec.val(i, 'COUPONPERIOD');
                const couponPercent = b_sec.val(i, 'COUPONPERCENT');

                const bondNKD = b_sec.val(i, 'ACCRUEDINT');
                const bondEnd = b_sec.val(i, 'MATDATE');
                const bondCUR = b_sec.val(i, 'CURRENCYID');


                var bondVolume = 0;

                if (bondIncome >= income_from && bondIncome <= income_to 
                    && bondPrice >= price_from && bondPrice <= price_to
                    && bondDuration >= duration_from && bondDuration <= duration_to)
                  {
                    const sv = await SearchVolume(secid, boardID, vcount);
                    if (sv && sv.vol_sum)
                      bondVolume = sv.vol_sum;
                    if (sv && sv.low_liquid == 0) // lowLiquid: 0 и 1 - переключатели. 1 - если за какой-то из дней оборот был меньше заданного
                      {
                        var MonthsOfPayments = await SearchMonthsOfPayments(secid);
                        // Emitent 
                        var em = await EmitentID(secid); // {emitent_id, emitent_title, emitent_inn};
                        var KR = '';
                        var Rating = '';
                        if (g_emitents_ui) {
                          g_emitents_ui.add_data(em);
                          KR = g_emitents_ui.get_KR(em.emitent_id);
                          Rating = g_emitents_ui.get_Rating(em.emitent_id);
                        }

                        const chk = g_checked[secid];

                        bonds.push([em.emitent_title, boardID, chk?'#':'',bondSName, KR, Rating, secid, 
                                   bondIncome, bondPrice, couponPercent,
                                   bondNKD, couponVal, couponPeriod, bondDuration, 
                                   bondVolume, bondEnd, 
                                   couponNext, MonthsOfPayments
                                  ])
//                        console.log('Cтрока № %s: %s.', bonds.length, JSON.stringify(g_bonds[g_bonds.length - 1]))
                      }
                  }
              }
            }
      }

      g_emitents_ui.save_emi();
      g_bonds_ui.load(bonds);
    } catch(e) {
      console.log(e);
      alert(e);
//      DOM.iSel('run_btn').disabled = false;
    } finally {
      DOM.qHide('#run_wait');
    }


  }


  function save_mybonds_json()
  {
    try{
      const str = localStorage.getItem(g_appid+"_mybonds");
      const json = JSON.parse(str);
      const str_save = JSON.stringify(json, null, 4);
      const blob = new Blob([str_save], {type:'text/plain;charset=UTF-8'});
      saveAs(blob, 'mybonds.json');

    }catch(e) {}
  }

  class TableUI {
    constructor(_table_id, _title, _colDef, tb_height, _data) 
    {
      this.table_id = _table_id;
      this.title = _title;
      this.data = _data;
      this.colDef = _colDef;
      this.tb_height = tb_height;
      this.table = null;
      this.use_selected = false;
      this.use_edit = false;
    }


    init_table() 
    {
      this.table = $(this.table_id).DataTable({
        columns: this.title,
        scrollY: this.tb_height ? this.tb_height: '60vh',
        scrollCollapse: true,
        paging: false,
        columnDefs: this.colDef ? this.colDef : [],
        colReorder: true
      });

      if (this.data)
        this.table.rows.add(this.data).draw();

      if (this.use_selected) {
        DOM.qSel(this.table_id+' tbody').onclick = (e) => {
          const el = e.target.closest('tr');
          if (el.classList.contains('selected')) {
            el.classList.remove('selected');
          } else {
            const prev = DOM.qSel(this.table_id+' tr.selected');
            if (prev)
              prev.classList.remove('selected');
              el.classList.add('selected');
          }
        };
      }

      if (this.use_edit) {
        DOM.qSel(this.table_id+' tbody').ondblclick = (e) => {
          const el = e.target.closest('tr');
          this.row_edit_ui(el);
        };
      }

    }

    row_del(el)
    {
    }

    row_add_ui()
    {
    }

    row_edit_ui(el)
    {
      //el.childNodes[0].textContent
      console.log(el);
    }

    row_del_ui()
    {
       var el = DOM.qSel(this.table_id+' tbody tr.selected');
       if (el)
         Msg.showYN("Do you want to remove selected row ?", async () =>{
           this.row_del(el);
         });
    }


    toggle_col(colNum)
    {
      if (this.table) {
        const column = this.table.column(colNum);
        column.visible(!column.visible());
      }
    }

    clear()
    {
      if (this.table)
        this.table.clear().draw();
    }

    async load(_data)
    {
      if (_data)
        this.data = _data;

      if (this.table && this.data) {
        this.table.clear().draw();
        this.table.rows.add(this.data).draw();
      }
    }
  }

  class Proc_Emi_Table extends TableUI {
    constructor()
    {
      const _title = [
        { title: 'Наименование'},
        { title: 'КР'},
        { title: 'Sum'},
        { title: 'Proc%'},
        { title: 'Брокер1'},
        { title: 'Брокер2'},
        { title: 'Брокер3'},
        { title: 'Брокер4'},
      ];
      const colDefs = [
        { "width": "400px", "targets": 0 },
        { targets: 2, className: 'dt-body-right' },
        { targets: 3, className: 'dt-body-right' },
        { targets: 4, className: 'dt-body-right' },
        { targets: 5, className: 'dt-body-right' },
        { targets: 6, className: 'dt-body-right' },
        { targets: 7, className: 'dt-body-right' },
        { targets: [1], orderData: [1, 0], },        
      ];

      super('#tb_proc_emi', _title, colDefs, '80vh');
      this.mybonds = {};

    }

    async init_table()
    {
      var lst = {};
      super.init_table();
      this.load_mybonds();

      for(var b of [1,2,3,4])  //brokers
      {
        const bonds = this.mybonds[b];
        if (!bonds)
          break;
        const keys = Object.keys(bonds);
        const br_id = 'br_'+b;
        for(var k of keys) 
        {
          const data = bonds[k];

          const count = data["count"];
          const emitent_id = data["emitent_id"];
          const kr = data["kr"]?data["kr"]:'--';
          const sum = data["sum"];
          const name = g_emitents_ui.get_Name(emitent_id);

          if (!lst[emitent_id])
            lst[emitent_id] = {emitent_id, name, kr, 'sum':0.0, 'count':0, 'proc':0.0, 'br_1':0.0, 'br_2':0.0, 'br_3':0.0, 'br_4':0.0};

          var VV = lst[emitent_id];
          VV.sum += sum;
          VV.count += count;
          VV[br_id] = VV[br_id] + sum;
        }
      }

      var Asum = 0.0;
      var A_br1 = 0.0;
      var A_br2 = 0.0;
      var A_br3 = 0.0;
      var A_br4 = 0.0;
      for(var V of Object.values(lst))
      {
        Asum += V.sum;
        A_br1 += V.br_1;
        A_br2 += V.br_2;
        A_br3 += V.br_3;
        A_br4 += V.br_4;
      }

      const fmt = new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits:2 });

      var rows = [];
      for(var V of Object.values(lst))
      {
        var proc = V.sum / Asum * 100;
        rows.push([V.name, V.kr, fmt.format(V.sum), proc.toFixed(2), fmt.format(V.br_1), fmt.format(V.br_2), fmt.format(V.br_3), fmt.format(V.br_4)]);
      }

      rows.push(['==========TOTAL==========', '', fmt.format(Asum), '', fmt.format(A_br1), fmt.format(A_br2), fmt.format(A_br3), fmt.format(A_br4)]);
      await this.load(rows);
    }


    load_mybonds()
    {
      try {
        const v = localStorage.getItem(g_appid+"_mybonds");
        if (v)
          this.mybonds = JSON.parse(v);
      } catch(e) {}
    } 

  }

  class Emitents_Table extends TableUI {
    constructor() 
    {
      const _title = [
        { title: 'Наим.сокр'},
        { title: 'ИНН'},
        { title: 'КР'},
        { title: 'Id'},
        { title: 'Rating'},
        { title: 'URL'},
      ];
      const colDefs = [
        { "width": "500px", "targets": 5 },
        { targets: 5,
          render: function(data, type, row, meta){
            if (data.length > 0) {
              var s = '';
              const lst = data.split(';');
              for(const v of lst)
                s += '<a href="'+v+'" target="_blank">'+v+'</a>'
              return s;
            } else 
              return '';
          }
        },
      ];

      super('#emitents', _title, colDefs, '76vh');
      this.emitents = {};

      this.iName = 0;
      this.iINN = 1;
      this.iKR = 2;
      this.iID = 3;
      this.iRating = 4;
      this.iURL = 5;
    }

    async init_table()
    {
       super.init_table();

       const data = await this.load_emi();
       await this.load(data);
    }

    get_KR(id, inn) 
    {
      if (this.emitents) {
        const em = this.emitents[id];
        if (em) {
          if (inn) {
            if (em.emitent_inn === inn)
              return em.emitent_kr ?? '';
            else
              return '';
          } else {
            return em.emitent_kr ?? '';
          }
        }
      }
      return '';
    }

    get_Name(id, inn) 
    {
      if (this.emitents) {
        const em = this.emitents[id];
        if (em) {
          if (inn) {
            if (em.emitent_inn === inn)
              return em.emitent_title;
            else
              return '';
          } else {
            return em.emitent_title;
          }
        }
      }
      return '';
    }

    get_Rating(id, inn) 
    {
      if (this.emitents) {
        const em = this.emitents[id];
        if (em) {
          if (inn) {
            if (em.emitent_inn === inn)
              return em.rating ?? '';
            else
              return '';
          } else {
            return em.rating ?? '';
          }
        }
      }
      return '';
    }

    get_URL(id, inn) 
    {
      if (this.emitents) {
        const em = this.emitents[id];
        if (em) {
          if (inn) {
            if (em.emitent_inn === inn)
              return em.url ?? '';
            else
              return '';
          } else {
            return em.url ?? '';
          }
        }
      }
      return '';
    }

    save_emi_json()
    {
      if (this.emitents) {
        var str = JSON.stringify(this.emitents, null, 4);
        var blob = new Blob([str], {type:'text/plain;charset=UTF-8'});
        saveAs(blob, 'emitents.json');
      }
    }

    save_emi()
    {
      if (this.emitents) {
        var str = JSON.stringify(this.emitents, null, 4);
        localStorage.setItem(g_appid+"emitents", str);
      }
    }

    add_data(em)
    {
      var v = this.emitents[em.emitent_id];
      if (v) {
        v.emitent_title = em.emitent_title;
        v.emitent_inn = em.emitent_inn;
        v.emitent = em.emitent;
      } else {
        this.emitents[em.emitent_id] = em;
      }
    }
    
    update_data(em)
    {
      var v = this.emitents[em.emitent_id];
      if (v) {
        v.emitent_title = em.emitent_title;
        v.emitent_inn = em.emitent_inn;
        v.emitent_kr = em.emitent_kr;
        v.emitent = em.emitent;
      } else {
        this.emitents[em.emitent_id] = em;
      }
    }

    async load_emi(str)
    {
      var lst = [];
      try {
        if (str) {
          var data_ok = false;
          const json = JSON.parse(str);
          const keys = Object.keys(json);
          if (keys.length > 0) {
            var data = json[keys[0]];
            var row = [];
            var v;
            if ((v = data["emitent_title"])!=null)
              row.push(v);
            if ((v = data["emitent_inn"])!=null)
              row.push(v);
            if ((v = data["emitent_kr"])!=null)
              row.push(v);
            if ((v = data["emitent_id"])!=null)
              row.push(v);
            if (row.length >= 4)
              data_ok = true;
          }
          if (data_ok)
             localStorage.setItem(g_appid+"emitents", str);
        }
  
        str = localStorage.getItem(g_appid+"emitents");
        if (str) {
          const json = JSON.parse(str);
          this.emitents = json;
          const keys = Object.keys(json);
          for(const k of keys) {
            var data = json[k];

            function VV(key, def)
            {
              const v = data[key];
              return v ? v : def;
            } 

            const title = VV('emitent_title','');
            const inn = VV('emitent_inn','');
            const kr = VV('emitent_kr','');
            const id = VV('emitent_id','');
            const rating = VV('rating','');
            const url = VV('url','');
  
            var row = [title, inn, kr, id, rating, url];
  
            lst.push(row);
          }
        }
  
        return lst;
  
      } catch(e) {
        console.log(e);
      }
    }
  
    row_edit_ui(el)
    {
      const data = this.table.row(el).data();
      const _kr = data[this.iKR]
      const id = data[this.iID]
      const _rating = data[this.iRating]
      const _url = data[this.iURL]

      DOM.qSel('#emitent-dlg #e_kr').value = _kr;
      DOM.qSel('#emitent-dlg #e_url').value = _url;
      DOM.qSel('#emitent-dlg #e_rating').value = _rating;

      DOM.qSel('#emitent-dlg #btn-ok').onclick = () => 
      {
        const kr = DOM.qSel('#emitent-dlg #e_kr').value;
        const url = DOM.qSel('#emitent-dlg #e_url').value;
        const rating = DOM.qSel('#emitent-dlg #e_rating').value;

        $('#emitent-dlg').modal('hide');

        data[this.iKR] = kr;
        data[this.iRating] = rating;
        data[this.iURL] = url;
   
        this.table.row(el).data(data).draw(false);

        //## Update storage
        this.emitents[id]['emitent_kr'] = kr;
        this.emitents[id]['url'] = url;
        this.emitents[id]['rating'] = rating;
        this.save_emi();

      };
  
      var dlg = $('#emitent-dlg .modal-content');
      dlg.width(600);
      $('#emitent-dlg').modal('show');
    }


  }


  class Bonds_Table extends TableUI {
    constructor() 
    {
      const title = [
        { title: 'Эмитент', num:0 },
        { title: 'Board', num:0 },
        { title: '#', num:0 },
        { title: 'Инструмент скр', num:0 },
        { title: 'КР', num:0 },
        { title: 'Rating', num:0 },
        
        { title: 'Код бумаги', num:0 },
        { title: 'Доход %', num:1 },
        { title: 'Цена %', num:1 }, 
        { title: 'Куп %', num:1 },
        { title: 'НКД', num:1 },
        { title: 'Купон', num:1 },
        { title: 'ДлКуп', num:1 },
        { title: 'Дюрац', num:1 },
        { title: 'V сделок', num:1 },
        { title: 'Погашение', num:0 },
        { title: 'КупонДт', num:0 },
        { title: 'Купоны', num:0 },
      ];

      const colDefs = [
        { "width": "280px", "targets": 0 },
        { targets: 7, className: 'dt-body-right' },
        { targets: 8, className: 'dt-body-right' },
        { targets: 9, className: 'dt-body-right' },
        { targets: 10, className: 'dt-body-right' },
        { targets: 11, className: 'dt-body-right' },
        { targets: 12, className: 'dt-body-right' },
        { targets: 13, className: 'dt-body-right' },
        { targets: 14, className: 'dt-body-right' },
        { targets: 15, className: 'dt-body-right' },
        { targets: 16, className: 'dt-body-right' },

        { targets: [2], orderData: [2, 4, 15, 7], },        
        { targets: [4], orderData: [4, 15, 7], },        

        { targets: 2,
          render: function(data, type, row, meta){
            if (data === '#') {
              return `<span style="background:cyan">${data}<span/>`
            } else 
              return data;
          }
        },

      ];


      super('#bonds', title, colDefs, '56vh');
    }

    row_edit_ui(el)
    {
      const data = this.table.row(el).data();
      var chk = data[2] === '#' ? '' : '#';
      var secid = data[6];
      var board = data[1];
      data[2] = chk;
      this.table.row(el).data(data).draw(false);

      var item = g_checked[secid];
      if (chk==='#') {
        if (!item) 
          g_checked[secid] = {secid, board};
      }
      save_checked_bonds(g_checked);
    }

    save_CSV()
    {
      var l = [];
      var s = [];
      for(var v of this.title) {
        s.push(v.title);
      }
      l.push(s.join('\t'));

      const sdata = this.table.rows().data();
      for(var r = 0; r < sdata.length; r++) {
        const cols = sdata[r];

        s = [];
        for(var i=0; i < cols.length; i++) {
          const is_num = this.title[i]['num'];
          if (is_num)
            s.push(cols[i]);
          else
            s.push('"'+cols[i]+'"');
        }
        l.push(s.join('\t'));
      }

      var blob = new Blob([l.join('\n')], {type:'text/plain;charset=UTF-8'});
      saveAs(blob, 'bonds.csv');
    }
  }

  class CheckedBonds_Table extends TableUI {
    constructor() 
    {
      const title = [
        { title: 'Эмитент', num:0 },
        { title: 'Board', num:0 },
        { title: '#', num:0 },
        { title: 'Есть', num:0 },
        { title: 'Инструмент скр', num:0 },
        { title: 'КР', num:0 },
        { title: 'Rating', num:0 },
        
        { title: 'Код бумаги', num:0 },
        { title: 'Доход %', num:1 },
        { title: 'Цена %', num:1 }, 
        { title: 'Куп %', num:1 },
        { title: 'НКД', num:1 },
        { title: 'Купон', num:1 },
        { title: 'ДлКуп', num:1 },
        { title: 'Дюрац', num:1 },
        { title: 'Погашение', num:0 },
        { title: 'КупонДт', num:0 },
        { title: 'Коммент', num:0 },
      ];

      const colDefs = [
        { "width": "150px", "targets": 0 },
        { "width": "240px", "targets": 17 },

        { targets: 8, className: 'dt-body-right' },
        { targets: 9, className: 'dt-body-right' },
        { targets: 10, className: 'dt-body-right' },
        { targets: 11, className: 'dt-body-right' },
        { targets: 12, className: 'dt-body-right' },
        { targets: 13, className: 'dt-body-right' },
        { targets: 14, className: 'dt-body-right' },
        { targets: 15, className: 'dt-body-right' },
        { targets: 16, className: 'dt-body-right' },

        { targets: [5], orderData: [5, 15, 8], }, 

        { targets: 3,
          render: function(data, type, row, meta){
            if (data === '@@@') {
              return `<span style="background:cyan">${data}<span/>`
            } else 
              return data;
          }
        },

      ];


      super('#bonds_checked', title, colDefs, '70vh');

      this.iEmitent = 0;
      this.iBoard = 1;
      this.iName = 4;
      this.iKR = 5;
      this.iRating = 6;
      this.iSecid = 7;
      this.iIncome = 8;
      this.iPrice = 9;
      this.iCuponPerc = 10;
      this.iNkd = 11;
      this.iCupon = 12;
      this.iCuponPeriod = 13;
      this.iDuration = 14;
      this.iMatDate = 15;
      this.iNextCuponDate = 16;
      this.iComment = 17;
      this.iEmID = 18;
    }

    async init_table()
    {
       super.init_table();

       if (g_checked) {
        this.load_table(g_checked);
       }
    }

    load_mybonds()
    {
      try {
        const v = localStorage.getItem(g_appid+"_mybonds");
        if (v)
          this.mybonds = JSON.parse(v);
      } catch(e) {}
    } 

    is_bought(secid)
    {
      for(var b of [1,2,3,4]) 
      {
        for(var acc of [0,1,2])
        {
           if (this.mybonds[b] && this.mybonds[b][acc+'_'+secid])
             return true;
        }
      }
      return false;
    }

    async load_table(DD)
    {
      var lst = [];

      this.load_mybonds();

      if (DD) {
        const keys = Object.keys(DD);
        for(const k of keys) {
          const data = DD[k];

          const secid = data["secid"];
          var board = data["board"];
          const em = await EmitentID(secid); // {emitent_id, emitent_title, emitent_inn};
          const KR = g_emitents_ui.get_KR(em.emitent_id);
          const Rating = g_emitents_ui.get_Rating(em.emitent_id);
          const Emitent = g_emitents_ui.get_Name(em.emitent_id);

          var bondSName = '';
          var income = '';
          var price = 0;
          var cupon_percent = 0;
          var nkd = 0;
          var cupon_val = 0;
          var cupon_period = 0;
          var duration = '';
          var matdate = 'YYY1-MM-DD';
          var next_cupon = 'YYY1-MM-DD';
          var comment = data["comment"];
          var est = this.is_bought(secid) ? '@@@':'';

          const rc = await getBondData(secid, board);
          if (rc) {
            bondSName = rc.SHORTNAME;
            board = rc.BOARDID;
            income = rc.YIELD;
            price = rc.LAST;
            cupon_percent = rc.COUPONPERCENT;
            nkd = rc.ACCRUEDINT;
            cupon_val = rc.COUPONVALUE;

            matdate = rc.MATDATE;
            next_cupon = rc.NEXTCOUPON;

            cupon_period = rc.COUPONPERIOD;
            duration = rc.DURATION;
          } 
          else {
            board = '----'
          }

          var row = [Emitent, board, '#', est, bondSName, KR?KR:'', Rating?Rating:'', secid, income,
               price, cupon_percent, nkd, cupon_val, cupon_period, duration, matdate,
               next_cupon, comment ? comment : '', em.emitent_id]; 
           
           lst.push(row);
        }
       }
       
       await this.load(lst);
    }

    row_del(el)
    {
      const data = this.table.row(el).data();
      const secid = data[this.iSecid]

      this.table.row('.selected').remove().draw(false);

      //## Update storage
      delete g_checked[secid];
      save_checked_bonds(g_checked);
    }

    refresh()
    {
      this.load_table(g_checked);
    }

    row_edit_ui(el)
    {
      const data = this.table.row(el).data();
      const _comm = data[this.iComment]
      const em_id = data[this.iEmID];
      const secid = data[this.iSecid];

      const url = g_emitents_ui.get_URL(em_id);
      DOM.qSel('#checked-dlg #c_comment').value = _comm;

      if (url.length > 0) {
        var s = '';
        for(const v of url.split(';'))
          s += '<a href="'+v+'" target="_blank">'+v+'</a>'

        DOM.qSel('#checked-dlg #c_url').innerHTML = s;
      }

      DOM.qSel('#checked-dlg #btn-ok').onclick = () => 
      {
        const comm = DOM.qSel('#checked-dlg #c_comment').value;

        $('#checked-dlg').modal('hide');

        data[this.iComment] = comm;
   
        this.table.row(el).data(data).draw(false);

        //## Update storage
        g_checked[secid].comment = comm;
        save_checked_bonds(g_checked);
      };
  
      var dlg = $('#checked-dlg .modal-content');
      dlg.width(600);
      $('#checked-dlg').modal('show');
    }

    save_CSV()
    {
      var l = [];
      var s = [];
      for(var v of this.title) {
        s.push(v.title);
      }
      l.push(s.join('\t'));

      const sdata = this.table.rows().data();
      for(var r = 0; r < sdata.length; r++) {
        const cols = sdata[r];

        s = [];
        for(var i=0; i < cols.length; i++) {
          const is_num = this.title[i]['num'];
          if (is_num)
            s.push(cols[i]);
          else
            s.push('"'+cols[i]+'"');
        }
        l.push(s.join('\t'));
      }

      var blob = new Blob([l.join('\n')], {type:'text/plain;charset=UTF-8'});
      saveAs(blob, 'bonds_checked.csv');
    }

    save_checked_json()
    {
      if (g_checked) {
        var str = JSON.stringify(g_checked, null, 4);
        var blob = new Blob([str], {type:'text/plain;charset=UTF-8'});
        saveAs(blob, 'bonds_checked.json');
      }
    }

  }


  class MyBonds_Table extends TableUI {
    constructor(table_id, broker_id) 
    {
      const title = [
        { title: 'Acc', num:1 },
        { title: 'Эмитент', num:0 },
        { title: 'Инструмент', num:0 },
        { title: 'КР', num:0 },
        { title: 'Rating', num:0 },
        { title: 'Count', num:1 },
        { title: 'Price%', num:1 },
        { title: 'Дох%-пок', num:1 },
        { title: 'SecId', num:1 },
        { title: 'Board', num:1 },
        { title: 'Тек-цена%', num:1 },
        { title: 'Тек-ставка%', num:1 },
        { title: 'Погашение', num:0 },
        { title: 'КупонДт', num:0 },
        { title: 'SUM', num:1 },
        { title: 'НКД', num:1 },
        { title: 'Купон', num:1 },
        { title: 'Купон%', num:1 },
        { title: 'Номинал', num:1 },
      ];

      const colDefs = [
        { "width": "120px", "targets": 1 },
        { "width": "120px", "targets": 2 },
        { targets: 5, className: 'dt-body-right' },
        { targets: 6, className: 'dt-body-right' },
        { targets: 7, className: 'dt-body-right' },

        { targets: 8, className: 'dt-body-right' },
        { targets: 9, className: 'dt-body-right' },
        { targets: 12, className: 'dt-body-right' },
        { targets: 13, className: 'dt-body-right' },
        { targets: 14, className: 'dt-body-right' },
        { targets: 15, className: 'dt-body-right' },
        { targets: 16, className: 'dt-body-right' },
        { targets: 17, className: 'dt-body-right' },
        { targets: 18, className: 'dt-body-right' },

        { targets: [0], orderData: [0, 2], },        
        { targets: [1], visible: false },        
      ];

      super(table_id, title, colDefs);

      this.iAcc = 0;
      this.iEmitent = 1;
      this.iName = 2;
      this.iKR = 3;
      this.iRating = 4;
      this.iCount = 5;
      this.iPrice = 6;
      this.iIncome = 7;
      this.iSecid = 8;
      this.iBoard = 9;
      this.iCurPrice = 10;
      this.iCurPercent = 11;
      this.iMatdate = 12;
      this.iNextCupon = 13;
      this.iSum = 14;
      this.iNkd = 15;
      this.iCupon = 16;
      this.iCuponPerc = 17;
      this.iNominal = 18;
      
      this.broker_id = broker_id;
      this.mybonds = g_mybonds;
      this.load_mybonds();
    }

    async init_table()
    {
       var lst = [];
       super.init_table();

       const bonds = this.mybonds[this.broker_id];
       if (bonds) {
        const keys = Object.keys(bonds);
        for(const k of keys) {
          const data = bonds[k];

          function VV(key, def)
          {
            const v = data[key];
            return v ? v : def;
          } 

          var emitent_id = data["emitent_id"];
          var KR = g_emitents_ui.get_KR(emitent_id);
          var Rating = g_emitents_ui.get_Rating(emitent_id);
          var Emitent = g_emitents_ui.get_Name(emitent_id);

          const acc = VV("acc", '0');
          const name = VV("name", '');
          const count = VV("count", 0);
          const price = VV("price", 0);
          const income = VV("income", '');
          const secid = VV("secid", '');
          var board = data["board"];  

          var curincome = VV("curincome", 0);
          var matdate = VV("matdate", 'YYY1-MM-DD');
          var nextcoupon = VV("nextcoupon", 'YYY1-MM-DD');
          var sum = VV("sum", 0);
          var nkd = VV("nkd", 0);
          var coupon_val = VV("coupon_val", 0);
          var coupon_percent = VV("coupon_percent", 0);
          var one_price = VV("one_price", 0);
          var cur_price = VV("cur_price", 0);
          var facevalue = VV("facevalue", 0);
          
          const rc = await getBondData(secid, board);
          if (rc) {
            board = rc.BOARDID;
            curincome = rc.YIELD;
            matdate = rc.MATDATE;
            nextcoupon = rc.NEXTCOUPON;
            sum = rc.ONE_PRICE * (count?count:0);
            nkd = rc.ACCRUEDINT;
            coupon_val = rc.COUPONVALUE;
            coupon_percent = rc.COUPONPERCENT;
            one_price = rc.ONE_PRICE;
            cur_price = rc.LAST;
            facevalue = rc.FACEVALUE;
            data["board"] = board;
            data["curincome"] = curincome;
            data["matdate"] = matdate;
            data["nextcoupon"] = nextcoupon;
            data["sum"] = sum;
            data["nkd"] = nkd;
            data["coupon_val"] = coupon_val;
            data["coupon_percent"] = coupon_percent;
            data["one_price"] = one_price;
            data["cur_price"] = cur_price;
            data["facevalue"] = facevalue;
            data["kr"] = KR?KR:'';
          } else {
            board = '----'
          }

          const fmt = new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits:2 });

          var row = [acc, Emitent, name, KR?KR:'', Rating?Rating:'', count, price, income, secid, 
              board, cur_price, curincome, matdate, nextcoupon, fmt.format(sum), nkd, coupon_val, 
              coupon_percent, facevalue];
           
           lst.push(row);
        }
       }
       
       await this.load(lst);
       this.save_mybonds();
    }


    load_mybonds()
    {
      try {
        const v = localStorage.getItem(g_appid+"_mybonds");
        if (v)
          this.mybonds = JSON.parse(v);
      } catch(e) {}
    } 

    save_mybonds()
    {
      try {
        const s = JSON.stringify(this.mybonds);
        localStorage.setItem(g_appid+"_mybonds", s);
      } catch(e) {}
    }

    row_del(el)
    {
      const data = this.table.row(el).data();
      const acc = data[this.iAcc]
      const secid = data[this.iSecid]

      this.table.row('.selected').remove().draw(false);

      //## Update storage
      this.load_mybonds();
      delete this.mybonds[this.broker_id][''+acc+'_'+secid];
      this.save_mybonds();
    }

    async update_list(id)
    {
      const rc = await getBonds(id);
      if (rc) {
        var b_list = DOM.qSel('#bond-dlg #l_bonds');
        b_list.innerHTML = '';

        for(var i=0; i < rc.length; i++) {
          var el = document.createElement('option');
          el.value = rc[i].shortname;
          b_list.appendChild(el);
        }
        if (rc.length == 1)
          DOM.qSel('#bond-dlg b_bond').value = rc[0].shortname;
      }
    }

    row_add_ui()
    {
      DOM.qSel('#bond-dlg #bond_data').reset();
      DOM.qSel('#bond-dlg #b_bond').readOnly = false;
      DOM.qSel('#bond-dlg #b_acc').readOnly = false;

      DOM.qSel('#bond-dlg #btn-check-bond').onclick = () => 
      {
        const bond = DOM.qSel('#bond-dlg #b_bond').value;
        this.update_list(bond);
      }
  
      DOM.qSel('#bond-dlg #btn-ok').onclick = async () => {
        const acc = DOM.qSel('#bond-dlg #b_acc').value;
        const name = DOM.qSel('#bond-dlg #b_bond').value;
        const count = DOM.qSel('#bond-dlg #b_count').value;
        const price = DOM.qSel('#bond-dlg #b_price').value;
        const income = DOM.qSel('#bond-dlg #b_income').value;

        const rcb = await getBonds(name);
        if (rcb.length != 1) {
          alert("Wrong bond Name "+name);
          return;
        }
        const emitent_id = rcb[0].emitent_id;
        const secid = rcb[0].secid;
        const kr = g_emitents_ui.get_KR(emitent_id);
        const Rating = g_emitents_ui.get_Rating(emitent_id);
        const Emitent = g_emitents_ui.get_Name(emitent_id);

        var board = '';
        var curincome = 0;
        var matdate = '';
        var nextcoupon = '';
        var sum = 0;
        var nkd = 0;
        var coupon_val = 0;
        var coupon_percent = 0;
        var one_price = 0;
        var cur_price = 0;
        var facevalue = 0;

        const rc = await getBondData(secid, board);
        if (rc) {
          board = rc.BOARDID;
          curincome = rc.YIELD;
          matdate = rc.MATDATE;
          nextcoupon = rc.NEXTCOUPON;
          sum = rc.ONE_PRICE * (count?count:0);
          nkd = rc.ACCRUEDINT;
          coupon_val = rc.COUPONVALUE;
          coupon_percent = rc.COUPONPERCENT;
          one_price = rc.ONE_PRICE;
          cur_price = rc.LAST;
          facevalue = rc.FACEVALUE;
        } else {
          board = '---';
        }

        $('#bond-dlg').modal('hide');

        const fmt = new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits:2 });

        var row = [acc, Emitent, name, kr, Rating?Rating:'', count, price, income, secid, 
                   board, cur_price, curincome, matdate, nextcoupon, fmt.format(sum), nkd, coupon_val, 
                   coupon_percent, facevalue];

        this.table.row.add(row).draw(false);

        //## Update storage
        this.load_mybonds();
        const br_list = this.mybonds[this.broker_id];
        if (!br_list)
           this.mybonds[this.broker_id] = {}

        this.mybonds[this.broker_id][''+acc+'_'+secid] = {
          acc, secid, name, count, price, income, emitent_id,
          board, curincome, matdate, nextcoupon, sum, nkd, coupon_val, coupon_percent,
          one_price, facevalue
        };
        this.save_mybonds();
        
      };
  
      var dlg = $('#bond-dlg .modal-content');
      dlg.width(400);
      $('#bond-dlg').modal('show');
  
    }

    row_edit_ui(el)
    {
      const data = this.table.row(el).data();
      const acc = data[this.iAcc]
      const name = data[this.iName]
      const _count = data[this.iCount]
      const _price = data[this.iPrice]
      const _income = data[this.iIncome]
      const secid = data[this.iSecid]


      DOM.qSel('#bond-dlg #b_id').value = secid;
      DOM.qSel('#bond-dlg #b_acc').value = acc;
      DOM.qSel('#bond-dlg #b_bond').value = name;
      DOM.qSel('#bond-dlg #b_count').value = _count;
      DOM.qSel('#bond-dlg #b_price').value = _price;
      DOM.qSel('#bond-dlg #b_income').value = _income;

      DOM.qSel('#bond-dlg #b_bond').readOnly = true;
      DOM.qSel('#bond-dlg #b_acc').readOnly = true;

      DOM.qSel('#bond-dlg #btn-ok').onclick = async () => 
      {
        const count = DOM.qSel('#bond-dlg #b_count').value;
        const price = DOM.qSel('#bond-dlg #b_price').value;
        const income = DOM.qSel('#bond-dlg #b_income').value;

        const rc = await getBonds(name);
        if (rc.length != 1) {
          alert("Wrong bond Name "+name);
          return;
        }
        const emitent_id = rc[0].emitent_id;
        const kr = g_emitents_ui.get_KR(emitent_id);
        const Rating = g_emitents_ui.get_Rating(emitent_id);
        const Emitent = g_emitents_ui.get_Name(emitent_id);

        //## Update storage
        this.load_mybonds();
        const mydata = this.mybonds[this.broker_id][''+acc+'_'+secid];
        mydata['count'] = count;
        mydata['price'] = price;
        mydata['income'] = income;
        mydata['sum'] = mydata.one_price * count;

        $('#bond-dlg').modal('hide');

        const fmt = new Intl.NumberFormat('ru-RU', { style: 'decimal', maximumFractionDigits:2 });

        data[this.iEmitent] = Emitent;
        data[this.iKR] = kr;
        data[this.iRating] = Rating;
        data[this.iCount] = count;
        data[this.iPrice] = price;
        data[this.iIncome] = income;
        data[this.iSum] = fmt.format(mydata.one_price * count);
        var row = data;
        this.table.row(el).data(row).draw();

        this.save_mybonds();

      };
  
      var dlg = $('#bond-dlg .modal-content');
      dlg.width(400);
      $('#bond-dlg').modal('show');
    }



  }


  class MyBonds_brok1 extends MyBonds_Table {
    constructor(table_id, broker_id) 
    {
      super("#br_brok1", 1);
    }

  }

  class MyBonds_brok2 extends MyBonds_Table {
    constructor(table_id, broker_id) 
    {
      super("#br_brok2", 2);
    }

  }

  class MyBonds_brok3 extends MyBonds_Table {
    constructor(table_id, broker_id) 
    {
      super("#br_brok3", 3);
    }

  }

  class MyBonds_brok4 extends MyBonds_Table {
    constructor(table_id, broker_id) 
    {
      super("#br_brok4", 4);
    }

  }


  function load_checked_bonds()
  {
    try {
      const v = localStorage.getItem(g_appid+"checked_bonds");
      if (v)
        return JSON.parse(v);
    } catch(e) {
    }
    return {};
  }

  function save_checked_bonds(v)
  {
    try {
      const s = JSON.stringify(v);
      localStorage.setItem(g_appid+"checked_bonds", s);
    } catch(e) {}
  }


  function fmt_i2(v)
  {
    return ('0'+v).slice(-2);
  }

  function col_ID(lst, s)
  {
    return lst.indexOf(s);
  }

  async function cached_fetch_JSON(url, key, hour)
  {
     if (!key)
       key = url;

     var now = new Date();
     var v = localStorage.getItem(g_appid+key);
     if (v) {
       try {
         const vv = JSON.parse(v);
         var dt = new Date(vv.date);
         if (hour)
           dt.setHours(dt.getHours()+1);
         else
           dt.setDate(dt.getDate()+1);
         if (dt > now)
           return vv.json;
       } catch(e) {}
     }
     var rc = await fetch(url);
     if (rc.ok) {
       const v = await rc.json();
       localStorage.setItem(g_appid+key, JSON.stringify({date:new Date(), json: v}));
       return v;
     }
  }



  /**
  async function BoardID(ID) //узнаем boardid любой бумаги по тикеру
  {
    var url = 'https://iss.moex.com/iss/securities/' + ID + '.json?iss.meta=off&iss.only=boards&boards.columns=secid,boardid,is_primary'
    try {
      const rc = await fetch(url);
      if (rc.ok) {
        const v = await rc.json();
        const boardID = v.boards.data.find(e => e[2] === 1)[1];
        // console.log("boardID для %s: %s", ID, boardID);
        return boardID
      }
    } catch (e) {
      console.log(e);
    }
  }
**/


  async function EmitentID(ID) 
  {
    var url = 'https://iss.moex.com/iss/securities.json?iss.meta=off&market=bonds&q='+ID;
    try {
      const v = await cached_fetch_JSON(url, 'emitent_'+ID);
      if (v) {
        const sec = new ColIndex(v.securities);
        const boardid = sec.val(0, 'primary_boardid');
        const emitent_id = sec.val(0, 'emitent_id');
        const emitent = sec.val(0, 'emitent_title').replaceAll('"','').replaceAll("'","");
        const emitent_inn = sec.val(0, 'emitent_inn');
        const emitent_title = emitent.replaceAll('Администрация','Адм')
                           .replaceAll('Акционерное общество','АО')
                           .replaceAll('акционерное общество','АО')
                           .replaceAll('АКЦИОНЕРНОЕ ОБЩЕСТВО','АО')
                           .replaceAll('Коммерческий банк','КБ')
                           .replaceAll('Микрофинансовая компания','МФК')
                           .replaceAll('микрофинансовая компания','МФК')
                           .replaceAll('Общество с ограниченной ответственностью','ООО')
                           .replaceAll('Министерство финансов','МинФин')
                           .replaceAll('общество с ограниченной ответственностью','ООО')
                           .replaceAll('ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ','ООО')
                           .replaceAll('Финансово-промышленной корпорации','ФПК')
                           .replaceAll('Публичное','Пуб')
                           .replaceAll('публичное','Пуб')

        return {emitent_id, emitent_title, emitent_inn, emitent_kr:"", emitent, boardid, url:'', rating:''};
      }
    } catch (e) {
      console.log(e);
    }
  }



  async function SearchVolume(ID, boardID, thresholdValue)
  {
    try {
      const dt = new Date();
      dt.setDate(dt.getDate() - 15);
      const pdate = dt.getFullYear()+'-'+fmt_i2(dt.getMonth()+1)+'-'+fmt_i2(dt.getDate());

      const url = `https://iss.moex.com/iss/history/engines/stock/markets/bonds/boards/${boardID}/securities/${ID}.json?iss.meta=off&iss.only=history&history.columns=SECID,TRADEDATE,VOLUME,NUMTRADES&limit=20&from=${pdate}`;

      const v = await cached_fetch_JSON(url, 'search_vol_'+ID+'_'+boardID);
      if (v) {
        const list = v.history.data;
        var vol_sum = 0;
        var low_liquid = 0;
        for(item of list) {
          var vol = item[2];
          vol_sum += vol;
          if (thresholdValue > vol) {
            low_liquid = 1;
          }
        }
        if (low_liquid != 1) {
//            console.log(`MOEXsearchVolume. Во всех днях оборот по бумаге ${ID} был больше, чем ${thresholdValue} шт каждый день.`)
        }
//        console.log(`MOEXsearchVolume. Итоговый оборот в бумагах (объем сделок, шт) за ${list.length} дней: ${vol_sum} шт нарастающим итогом.`)
        return { low_liquid, vol_sum};
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }


  async function SearchMonthsOfPayments(ID) //узнаём месяцы, когда происходят выплаты
  {
// also amortizations could be fetch too
    const now = Date.now();
    var formattedDates = '';
    var done = false;
    var start = 0;
    const pagesize = 100;
    var couponDates = {};

    while(!done) {
      var url = `https://iss.moex.com/iss/statistics/engines/stock/markets/bonds/bondization/${ID}.json?iss.meta=off&iss.only=coupons&start=${start}&limit=${pagesize}&iss.only=coupons.cursor,coupons`
      
      try {
        const v = await cached_fetch_JSON(url, 'search_month_'+ID+'_'+start);
        if (v) {
          const cdt = new ColIndex(v.coupons);
          const cursor = new ColIndex(v['coupons.cursor']);
          const total = cursor.val(0, 'TOTAL')

          if (start + pagesize >= total)
            done = true;
          else
            start += pagesize;

          for (var i = 0; i < v.coupons.data.length; i++) {
              const coupondate = cdt.val(i, 'coupondate');
              if ((new Date(coupondate)) > now) {
                const s_month = coupondate.substring(5,7);
                couponDates[parseInt(s_month)]= s_month;
              }
          }
        }
      } catch (e) {
        console.log(e);
        alert(e);
        done = true;
      }
    }

    for(var m=1; m <=12; m++) {
      formattedDates += couponDates[m] ?? '--';
      formattedDates += m == 12 ? '' : '-'; 
    }

    return formattedDates
  }


  async function getBonds(ID) 
  {
    var v = [];
    var url = 'https://iss.moex.com/iss/securities.json?iss.meta=off&market=bonds&q='+encodeURIComponent(ID);
    try {
      const rc = await fetch(url);
      if (rc.ok) {
        const json = await rc.json();
        const sec = new ColIndex(json.securities);
        for(var i=0; i < json.securities.data.length; i++) {
          var row = {};
          const name = sec.val(i, "shortname");
          if (name.startsWith(ID)) {
            row["secid"] = sec.val(i, "secid");
            row["shortname"] = name;
            row["emitent_id"] = sec.val(i, "emitent_id");
            v.push(row);
          }
        }
        return v;
      }
    } catch (e) {
      console.log(e);
    }
  }

/***
 https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities/RU000A103JR3.json?iss.dp=comma&iss.meta=off&iss.only=securities,marketdata
{
"securities": {
	"columns": ["SECID", "BOARDID", "SHORTNAME", "PREVWAPRICE", "YIELDATPREVWAPRICE", "COUPONVALUE", "NEXTCOUPON", "ACCRUEDINT", "PREVPRICE", "LOTSIZE", "FACEVALUE", "BOARDNAME", "STATUS", "MATDATE", "DECIMALS", "COUPONPERIOD", "ISSUESIZE", "PREVLEGALCLOSEPRICE", "PREVADMITTEDQUOTE", "PREVDATE", "SECNAME", "REMARKS", "MARKETCODE", "INSTRID", "SECTORID", "MINSTEP", "FACEUNIT", "BUYBACKPRICE", "BUYBACKDATE", "ISIN", "LATNAME", "REGNUMBER", "CURRENCYID", "ISSUESIZEPLACED", "LISTLEVEL", "SECTYPE", "COUPONPERCENT", "OFFERDATE", "SETTLEDATE", "LOTVALUE"], 
	"data": [
		["RU000A103JR3", "TQCB", "Джи-гр 2Р1", 97.27, 14.78, 23.78, "2023-05-15", 0.26, 97.53, 1, 900, "Т+: Облигации - безадрес.", "A", "2024-08-12", 2, 91, 3000000, 97.53, null, "2023-02-10", "Джи-групп 002P-01", null, "FNDT", "EICB", null, 0.01, "SUR", null, "0000-00-00", "RU000A103JR3", "G-group 2P1", "4B02-01-10609-P-001P", "SUR", 3000000, 2, "8", 10.600, null, "2023-02-14", 900]
	]
},
"marketdata": {
	"columns": ["SECID", "BID", "BIDDEPTH", "OFFER", "OFFERDEPTH", "SPREAD", "BIDDEPTHT", "OFFERDEPTHT", "OPEN", "LOW", "HIGH", "LAST", "LASTCHANGE", "LASTCHANGEPRCNT", "QTY", "VALUE", "YIELD", "VALUE_USD", "WAPRICE", "LASTCNGTOLASTWAPRICE", "WAPTOPREVWAPRICEPRCNT", "WAPTOPREVWAPRICE", "YIELDATWAPRICE", "YIELDTOPREVYIELD", "CLOSEYIELD", "CLOSEPRICE", "MARKETPRICETODAY", "MARKETPRICE", "LASTTOPREVPRICE", "NUMTRADES", "VOLTODAY", "VALTODAY", "VALTODAY_USD", "BOARDID", "TRADINGSTATUS", "UPDATETIME", "DURATION", "NUMBIDS", "NUMOFFERS", "CHANGE", "TIME", "HIGHBID", "LOWOFFER", "PRICEMINUSPREVWAPRICE", "LASTBID", "LASTOFFER", "LCURRENTPRICE", "LCLOSEPRICE", "MARKETPRICE2", "ADMITTEDQUOTE", "OPENPERIODPRICE", "SEQNUM", "SYSTIME", "VALTODAY_RUR", "IRICPICLOSE", "BEICLOSE", "CBRCLOSE", "YIELDTOOFFER", "YIELDLASTCOUPON", "TRADINGSESSION"], 
	"data": [
		["RU000A103JR3", null, null, null, null, 0, 0, 0, 97.55, 97.23, 97.95, 97.89, 0, 0, 1, 881.01, 13.91, 12.1, 97.66, 0, 0.4, 0.39, 14.24, -0.54, 0, null, 97.66, 97.27, 0.37, 291, 3601, 3165163, 43482, "TQCB", "N", "23:50:03", 303, null, null, 0.36, "18:45:00", null, null, 0.62, null, null, 97.88, 97.89, 97.66, null, 97.55, 20230214000501, "2023-02-14 00:05:01", 3165163, null, null, null, null, null, null]
	]
}}

 */

  async function getBondData(secid, board) 
  {
    async function try_fetch(_secid, _board)
    {
      const url = `https://iss.moex.com/iss/engines/stock/markets/bonds/boards/${_board}/securities/${_secid}.json?iss.dp=comma&iss.meta=off&iss.only=securities,marketdata`;
      const json = await cached_fetch_JSON(url, 'bond_data_'+_secid+'_'+_board, 1);
      if (json && json.securities && json.securities.data.length > 0)
        return json;
      else
        return null;
    }


    var json;
    try {
      if (secid && board) {
        json = await try_fetch(secid, board);
      }
      else {
        json = await try_fetch(secid,'TQCB');
        if (!json)
          json = await try_fetch(secid, 'TQIR');
        if (!json)
          json = await try_fetch(secid, 'TQOB');
      }
      if (!json)
        return null;

      const sec = new ColIndex(json.securities);
      const market = new ColIndex(json.marketdata);
      const ONE_PRICE = (sec.val(0, 'FACEVALUE') * market.val(0, 'LAST')/100 + sec.val(0, 'ACCRUEDINT'));

      return {
        'SECID' : sec.val(0, 'SECID'),
        'BOARDID' : sec.val(0, 'BOARDID'),
        'SHORTNAME' : sec.val(0, 'SHORTNAME'),
        'COUPONVALUE' : sec.val(0, 'COUPONVALUE'),
        'NEXTCOUPON' : sec.val(0, 'NEXTCOUPON'),
        'ACCRUEDINT' : sec.val(0, 'ACCRUEDINT'),
        'FACEVALUE' : sec.val(0, 'FACEVALUE'),
        'MATDATE' : sec.val(0, 'MATDATE'),
        'COUPONPERCENT' : sec.val(0, 'COUPONPERCENT'),
        'COUPONPERIOD' : sec.val(0, 'COUPONPERIOD'),
        'LAST' : market.val(0, 'LAST'),
        'YIELD' : market.val(0, 'YIELD'),
        'DURATION' : market.val(0, 'DURATION'),
        ONE_PRICE,
      }
    } catch(e) {
      console.log(e);
    }
  }


  class ColIndex {
    constructor(moex_data)
    {
      this.columns = moex_data['columns'];
      this.data = moex_data['data'];
      this.mm = {};
    }

    val(row, name)
    {
      let id = this.mm[name];
      if (!id) {
        id = this.columns.indexOf(name);
        if (id == -1)
          return null;

        this.mm[name] = id;
      }
      return this.data[row][id];
    }
  }



})();

