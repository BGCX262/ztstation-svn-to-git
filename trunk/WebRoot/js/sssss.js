/**
 * @class Ext.grid.GridPanel
 * @extends Ext.Panel
 * 

This class represents the primary interface of a component based grid control to represent data
 * in a tabular format of rows and columns. The GridPanel is composed of the following:

 * 


    *  * {@link Ext.data.Store Store} : The Model holding the data records (rows)
       *

    *  * {@link Ext.grid.ColumnModel Column model} : Column makeup
       *

    *  * {@link Ext.grid.GridView View} : Encapsulates the user interface
       *

    *  * {@link Ext.grid.AbstractSelectionModel selection model} : Selection behavior
       *

       * 


 * 

Example usage:

 * 


var grid = new Ext.grid.GridPanel({
    {@link #store}: new (@link Ext.data.Store}({
        {@link Ext.data.Store#autoDestroy autoDestroy}: true,
        {@link Ext.data.Store#reader reader}: reader,
        {@link Ext.data.Store#data data}: xg.dummyData
    }),
    {@link #columns}: [
        {id: 'company', header: 'Company', width: 200, sortable: true, dataIndex: 'company'},
        {header: 'Price', width: 120, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
        {header: 'Change', width: 120, sortable: true, dataIndex: 'change'},
        {header: '% Change', width: 120, sortable: true, dataIndex: 'pctChange'},
        // instead of specifying renderer: Ext.util.Format.dateRenderer('m/d/Y') use xtype
        {header: 'Last Updated', width: 135, sortable: true, dataIndex: 'lastChange', xtype: 'datecolumn', format: 'M d, Y'}
    ],
    {@link #viewConfig}: {
        {@link Ext.grid.GridView#forceFit forceFit}: true,

//      Return CSS class to apply to rows depending upon data values
        {@link Ext.grid.GridView#getRowClass getRowClass}: function(record, index) {
            var c = record.{@link Ext.data.Record#get get}('change');
            if (c < 0) {
                return 'price-fall';
            } else if (c > 0) {
                return 'price-rise';
            }
        }
    },
    {@link #sm}: new Ext.grid.RowSelectionModel({singleSelect:true}),
    width: 600,
    height: 300,
    frame: true,
    title: 'Framed with Row Selection and Horizontal Scrolling',
    iconCls: 'icon-grid'
});
 * 


 * 

Notes:

 * 


    *  * Although this class inherits many configuration options from base classes, some of them
       * (such as autoScroll, autoWidth, layout, items, etc) are not used by this class, and will
       * have no effect.

    *  * A grid requires a width in which to scroll its columns, and a height in which to
       * scroll its rows. These dimensions can either be set explicitly through the
       * {@link Ext.BoxComponent#height height} and {@link Ext.BoxComponent#width width}
       * configuration options or implicitly set by using the grid as a child item of a
       * {@link Ext.Container Container} which will have a {@link Ext.Container#layout layout manager}
       * provide the sizing of its child items (for example the Container of the Grid may specify
       * {@link Ext.Container#layout layout}:'fit').

    *  * To access the data in a Grid, it is necessary to use the data model encapsulated
       * by the {@link #store Store}. See the {@link #cellclick} event for more details.

       * 


 * @constructor
 * @param {Object} config The config object
 * @xtype grid
 */
Ext.grid.GridPanel = Ext.extend(Ext.Panel, {
    
/**
     * @cfg {String} autoExpandColumn
     * 

The {@link Ext.grid.Column#id id} of a {@link Ext.grid.Column column} in
     * this grid that should expand to fill unused space. This value specified here can not
     * be 0.

     * 

Note: If the Grid's {@link Ext.grid.GridView view} is configured with
     * {@link Ext.grid.GridView#forceFit forceFit}=true the autoExpandColumn
     * is ignored. See {@link Ext.grid.Column}.{@link Ext.grid.Column#width width}
     * for additional details.

     * 

See {@link #autoExpandMax} and {@link #autoExpandMin} also.

     */
    autoExpandColumn : false,
    
/**
     * @cfg {Number} autoExpandMax The maximum width the {@link #autoExpandColumn}
     * can have (if enabled). Defaults to 1000.
     */
    autoExpandMax : 1000,
    
/**
     * @cfg {Number} autoExpandMin The minimum width the {@link #autoExpandColumn}
     * can have (if enabled). Defaults to 50.
     */
    autoExpandMin : 50,
    
/**
     * @cfg {Boolean} columnLines true to add css for column separation lines.
     * Default is false.
     */
    columnLines : false,
    
/**
     * @cfg {Object} cm Shorthand for {@link #colModel}.
     */
    
/**
     * @cfg {Object} colModel The {@link Ext.grid.ColumnModel} to use when rendering the grid (required).
     */
    
/**
     * @cfg {Array} columns An array of {@link Ext.grid.Column columns} to auto create a
     * {@link Ext.grid.ColumnModel}.  The ColumnModel may be explicitly created via the
     * {@link #colModel} configuration property.
     */
    
/**
     * @cfg {String} ddGroup The DD group this GridPanel belongs to. Defaults to 'GridDD' if not specified.
     */
    
/**
     * @cfg {String} ddText
     * Configures the text in the drag proxy.  Defaults to:
     * 


     * ddText : '{0} selected row{1}'
     * 


     * {0} is replaced with the number of selected rows.
     */
    ddText : '{0} selected row{1}',
    
/**
     * @cfg {Boolean} deferRowRender 

Defaults to true to enable deferred row rendering.

     * 

This allows the GridPanel to be initially rendered empty, with the expensive update of the row
     * structure deferred so that layouts with GridPanels appear more quickly.

     */
    deferRowRender : true,
    
/**
     * @cfg {Boolean} disableSelection 

true to disable selections in the grid. Defaults to false.

     * 

Ignored if a {@link #selModel SelectionModel} is specified.

     */
    
/**
     * @cfg {Boolean} enableColumnResize false to turn off column resizing for the whole grid. Defaults to true.
     */
    
/**
     * @cfg {Boolean} enableColumnHide Defaults to true to enable hiding of columns with the header context menu.
     */
    enableColumnHide : true,
    
/**
     * @cfg {Boolean} enableColumnMove Defaults to true to enable drag and drop reorder of columns. false
     * to turn off column reordering via drag drop.
     */
    enableColumnMove : true,
    
/**
     * @cfg {Boolean} enableDragDrop 

Enables dragging of the selected rows of the GridPanel. Defaults to false.

     * 

Setting this to true causes this GridPanel's {@link #getView GridView} to
     * create an instance of {@link Ext.grid.GridDragZone}. Note: this is available only after
     * the Grid has been rendered as the GridView's {@link Ext.grid.GridView#dragZone dragZone}
     * property.

     * 

A cooperating {@link Ext.dd.DropZone DropZone} must be created who's implementations of
     * {@link Ext.dd.DropZone#onNodeEnter onNodeEnter}, {@link Ext.dd.DropZone#onNodeOver onNodeOver},
     * {@link Ext.dd.DropZone#onNodeOut onNodeOut} and {@link Ext.dd.DropZone#onNodeDrop onNodeDrop} are able
     * to process the {@link Ext.grid.GridDragZone#getDragData data} which is provided.

     */
    enableDragDrop : false,
    
/**
     * @cfg {Boolean} enableHdMenu Defaults to true to enable the drop down button for menu in the headers.
     */
    enableHdMenu : true,
    
/**
     * @cfg {Boolean} hideHeaders True to hide the grid's header. Defaults to false.
     */
    
/**
     * @cfg {Object} loadMask An {@link Ext.LoadMask} config or true to mask the grid while
     * loading. Defaults to false.
     */
    loadMask : false,
    
/**
     * @cfg {Number} maxHeight Sets the maximum height of the grid - ignored if autoHeight is not on.
     */
    
/**
     * @cfg {Number} minColumnWidth The minimum width a column can be resized to. Defaults to 25.
     */
    minColumnWidth : 25,
    
/**
     * @cfg {Object} sm Shorthand for {@link #selModel}.
     */
    
/**
     * @cfg {Object} selModel Any subclass of {@link Ext.grid.AbstractSelectionModel} that will provide
     * the selection model for the grid (defaults to {@link Ext.grid.RowSelectionModel} if not specified).
     */
    
/**
     * @cfg {Ext.data.Store} store The {@link Ext.data.Store} the grid should use as its data source (required).
     */
    
/**
     * @cfg {Boolean} stripeRows true to stripe the rows. Default is false.
     * 

This causes the CSS class x-grid3-row-alt to be added to alternate rows of
     * the grid. A default CSS rule is provided which sets a background colour, but you can override this
     * with a rule which either overrides the background-color style using the '!important'
     * modifier, or which uses a CSS selector of higher specificity.

     */
    stripeRows : false,
    
/**
     * @cfg {Boolean} trackMouseOver True to highlight rows when the mouse is over. Default is true
     * for GridPanel, but false for EditorGridPanel.
     */
    trackMouseOver : true,
    
/**
     * @cfg {Array} stateEvents
     * An array of events that, when fired, should trigger this component to save its state.
     * Defaults to:


     * stateEvents: ['columnmove', 'columnresize', 'sortchange']
     * 


     * 

These can be any types of events supported by this component, including browser or
     * custom events (e.g., ['click', 'customerchange']).

     * 

See {@link Ext.Component#stateful} for an explanation of saving and restoring
     * Component state.

     */
    stateEvents : ['columnmove', 'columnresize', 'sortchange'],
    
/**
     * @cfg {Object} view The {@link Ext.grid.GridView} used by the grid. This can be set
     * before a call to {@link Ext.Component#render render()}.
     */
    view : null,
    
/**
     * @cfg {Object} viewConfig A config object that will be applied to the grid's UI view.  Any of
     * the config options available for {@link Ext.grid.GridView} can be specified here. This option
     * is ignored if {@link #view} is specified.
     */

    // private
    rendered : false,
    // private
    viewReady : false,

    // private
    initComponent : function(){
        Ext.grid.GridPanel.superclass.initComponent.call(this);

        if(this.columnLines){
            this.cls = (this.cls || '') + ' x-grid-with-col-lines';
        }
        // override any provided value since it isn't valid
        // and is causing too many bug reports ;)
        this.autoScroll = false;
        this.autoWidth = false;

        if(Ext.isArray(this.columns)){
            this.colModel = new Ext.grid.ColumnModel(this.columns);
            delete this.columns;
        }

        // check and correct shorthanded configs
        if(this.ds){
            this.store = this.ds;
            delete this.ds;
        }
        if(this.cm){
            this.colModel = this.cm;
            delete this.cm;
        }
        if(this.sm){
            this.selModel = this.sm;
            delete this.sm;
        }
        this.store = Ext.StoreMgr.lookup(this.store);

        this.addEvents(
            // raw events
            
/**
             * @event click
             * The raw click event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'click',
            
/**
             * @event dblclick
             * The raw dblclick event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'dblclick',
            
/**
             * @event contextmenu
             * The raw contextmenu event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'contextmenu',
            
/**
             * @event mousedown
             * The raw mousedown event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'mousedown',
            
/**
             * @event mouseup
             * The raw mouseup event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'mouseup',
            
/**
             * @event mouseover
             * The raw mouseover event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'mouseover',
            
/**
             * @event mouseout
             * The raw mouseout event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'mouseout',
            
/**
             * @event keypress
             * The raw keypress event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'keypress',
            
/**
             * @event keydown
             * The raw keydown event for the entire grid.
             * @param {Ext.EventObject} e
             */
            'keydown',

            // custom events
            
/**
             * @event cellmousedown
             * Fires before a cell is clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'cellmousedown',
            
/**
             * @event rowmousedown
             * Fires before a row is clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Ext.EventObject} e
             */
            'rowmousedown',
            
/**
             * @event headermousedown
             * Fires before a header is clicked
             * @param {Grid} this
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'headermousedown',

            
/**
             * @event cellclick
             * Fires when a cell is clicked.
             * The data for the cell is drawn from the {@link Ext.data.Record Record}
             * for this row. To access the data in the listener function use the
             * following technique:
             * 


function(grid, rowIndex, columnIndex, e) {
    var record = grid.getStore().getAt(rowIndex);  // Get the Record
    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
    var data = record.get(fieldName);
}


             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'cellclick',
            
/**
             * @event celldblclick
             * Fires when a cell is double clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'celldblclick',
            
/**
             * @event rowclick
             * Fires when a row is clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Ext.EventObject} e
             */
            'rowclick',
            
/**
             * @event rowdblclick
             * Fires when a row is double clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Ext.EventObject} e
             */
            'rowdblclick',
            
/**
             * @event headerclick
             * Fires when a header is clicked
             * @param {Grid} this
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'headerclick',
            
/**
             * @event headerdblclick
             * Fires when a header cell is double clicked
             * @param {Grid} this
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'headerdblclick',
            
/**
             * @event rowcontextmenu
             * Fires when a row is right clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Ext.EventObject} e
             */
            'rowcontextmenu',
            
/**
             * @event cellcontextmenu
             * Fires when a cell is right clicked
             * @param {Grid} this
             * @param {Number} rowIndex
             * @param {Number} cellIndex
             * @param {Ext.EventObject} e
             */
            'cellcontextmenu',
            
/**
             * @event headercontextmenu
             * Fires when a header is right clicked
             * @param {Grid} this
             * @param {Number} columnIndex
             * @param {Ext.EventObject} e
             */
            'headercontextmenu',
            
/**
             * @event bodyscroll
             * Fires when the body element is scrolled
             * @param {Number} scrollLeft
             * @param {Number} scrollTop
             */
            'bodyscroll',
            
/**
             * @event columnresize
             * Fires when the user resizes a column
             * @param {Number} columnIndex
             * @param {Number} newSize
             */
            'columnresize',
            
/**
             * @event columnmove
             * Fires when the user moves a column
             * @param {Number} oldIndex
             * @param {Number} newIndex
             */
            'columnmove',
            
/**
             * @event sortchange
             * Fires when the grid's store sort changes
             * @param {Grid} this
             * @param {Object} sortInfo An object with the keys field and direction
             */
            'sortchange',
            
/**
             * @event reconfigure
             * Fires when the grid is reconfigured with a new store and/or column model.
             * @param {Grid} this
             * @param {Ext.data.Store} store The new store
             * @param {Ext.grid.ColumnModel} colModel The new column model
             */
            'reconfigure'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.grid.GridPanel.superclass.onRender.apply(this, arguments);

        var c = this.body;

        this.el.addClass('x-grid-panel');

        var view = this.getView();
        view.init(this);

        this.mon(c, {
            mousedown: this.onMouseDown,
            click: this.onClick,
            dblclick: this.onDblClick,
            contextmenu: this.onContextMenu,
            keydown: this.onKeyDown,
            scope: this
        });

        this.relayEvents(c, ['mousedown','mouseup','mouseover','mouseout','keypress']);

        this.getSelectionModel().init(this);
        this.view.render();
    },

    // private
    initEvents : function(){
        Ext.grid.GridPanel.superclass.initEvents.call(this);

        if(this.loadMask){
            this.loadMask = new Ext.LoadMask(this.bwrap,
                    Ext.apply({store:this.store}, this.loadMask));
        }
    },

    initStateEvents : function(){
        Ext.grid.GridPanel.superclass.initStateEvents.call(this);
        this.mon(this.colModel, 'hiddenchange', this.saveState, this, {delay: 100});
    },

    applyState : function(state){
        var cm = this.colModel;
        var cs = state.columns;
        if(cs){
            for(var i = 0, len = cs.length; i < len; i++){
                var s = cs[i];
                var c = cm.getColumnById(s.id);
                if(c){
                    c.hidden = s.hidden;
                    c.width = s.width;
                    var oldIndex = cm.getIndexById(s.id);
                    if(oldIndex != i){
                        cm.moveColumn(oldIndex, i);
                    }
                }
            }
        }
        if(state.sort && this.store){
            this.store[this.store.remoteSort ? 'setDefaultSort' : 'sort'](state.sort.field, state.sort.direction);
        }
        delete state.columns;
        delete state.sort;
        Ext.grid.GridPanel.superclass.applyState.call(this, state);
    },

    getState : function(){
        var o = {columns: []};
        for(var i = 0, c; (c = this.colModel.config[i]); i++){
            o.columns[i] = {
                id: c.id,
                width: c.width
            };
            if(c.hidden){
                o.columns[i].hidden = true;
            }
        }
        if(this.store){
            var ss = this.store.getSortState();
            if(ss){
                o.sort = ss;
            }
        }
        return o;
    },

    // private
    afterRender : function(){
        Ext.grid.GridPanel.superclass.afterRender.call(this);
        this.view.layout();
        if(this.deferRowRender){
            this.view.afterRender.defer(10, this.view);
        }else{
            this.view.afterRender();
        }
        this.viewReady = true;
    },

    
/**
     * 

Reconfigures the grid to use a different Store and Column Model
     * and fires the 'reconfigure' event. The View will be bound to the new
     * objects and refreshed.

     * 

Be aware that upon reconfiguring a GridPanel, certain existing settings may become
     * invalidated. For example the configured {@link #autoExpandColumn} may no longer exist in the
     * new ColumnModel. Also, an existing {@link Ext.PagingToolbar PagingToolbar} will still be bound
     * to the old Store, and will need rebinding. Any {@link #plugins} might also need reconfiguring
     * with the new data.

     * @param {Ext.data.Store} store The new {@link Ext.data.Store} object
     * @param {Ext.grid.ColumnModel} colModel The new {@link Ext.grid.ColumnModel} object
     */
    reconfigure : function(store, colModel){
        if(this.loadMask){
            this.loadMask.destroy();
            this.loadMask = new Ext.LoadMask(this.bwrap,
                    Ext.apply({}, {store:store}, this.initialConfig.loadMask));
        }
        this.view.initData(store, colModel);
        this.store = store;
        this.colModel = colModel;
        if(this.rendered){
            this.view.refresh(true);
        }
        this.fireEvent('reconfigure', this, store, colModel);
    },

    // private
    onKeyDown : function(e){
        this.fireEvent('keydown', e);
    },

    // private
    onDestroy : function(){
        if(this.rendered){
            var c = this.body;
            c.removeAllListeners();
            c.update('');
            Ext.destroy(this.view, this.loadMask);
        }else if(this.store && this.store.autoDestroy){
            this.store.destroy();
        }
        Ext.destroy(this.colModel, this.selModel);
        this.store = this.selModel = this.colModel = this.view = this.loadMask = null;
        Ext.grid.GridPanel.superclass.onDestroy.call(this);
    },

    // private
    processEvent : function(name, e){
        this.fireEvent(name, e);
        var t = e.getTarget();
        var v = this.view;
        var header = v.findHeaderIndex(t);
        if(header !== false){
            this.fireEvent('header' + name, this, header, e);
        }else{
            var row = v.findRowIndex(t);
            var cell = v.findCellIndex(t);
            if(row !== false){
                this.fireEvent('row' + name, this, row, e);
                if(cell !== false){
                    this.fireEvent('cell' + name, this, row, cell, e);
                }
            }
        }
    },

    // private
    onClick : function(e){
        this.processEvent('click', e);
    },

    // private
    onMouseDown : function(e){
        this.processEvent('mousedown', e);
    },

    // private
    onContextMenu : function(e, t){
        this.processEvent('contextmenu', e);
    },

    // private
    onDblClick : function(e){
        this.processEvent('dblclick', e);
    },

    // private
    walkCells : function(row, col, step, fn, scope){
        var cm = this.colModel, clen = cm.getColumnCount();
        var ds = this.store, rlen = ds.getCount(), first = true;
        if(step < 0){
            if(col < 0){
                row--;
                first = false;
            }
            while(row >= 0){
                if(!first){
                    col = clen-1;
                }
                first = false;
                while(col >= 0){
                    if(fn.call(scope || this, row, col, cm) === true){
                        return [row, col];
                    }
                    col--;
                }
                row--;
            }
        } else {
            if(col >= clen){
                row++;
                first = false;
            }
            while(row < rlen){
                if(!first){
                    col = 0;
                }
                first = false;
                while(col < clen){
                    if(fn.call(scope || this, row, col, cm) === true){
                        return [row, col];
                    }
                    col++;
                }
                row++;
            }
        }
        return null;
    },

    // private
    onResize : function(){
        Ext.grid.GridPanel.superclass.onResize.apply(this, arguments);
        if(this.viewReady){
            this.view.layout();
        }
    },

    
/**
     * Returns the grid's underlying element.
     * @return {Element} The element
     */
    getGridEl : function(){
        return this.body;
    },

    // private for compatibility, overridden by editor grid
    stopEditing : Ext.emptyFn,

    
/**
     * Returns the grid's selection model configured by the {@link #selModel}
     * configuration option. If no selection model was configured, this will create
     * and return a {@link Ext.grid.RowSelectionModel RowSelectionModel}.
     * @return {SelectionModel}
     */
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Ext.grid.RowSelectionModel(
                    this.disableSelection ? {selectRow: Ext.emptyFn} : null);
        }
        return this.selModel;
    },

    
/**
     * Returns the grid's data store.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    
/**
     * Returns the grid's ColumnModel.
     * @return {Ext.grid.ColumnModel} The column model
     */
    getColumnModel : function(){
        return this.colModel;
    },

    
/**
     * Returns the grid's GridView object.
     * @return {Ext.grid.GridView} The grid view
     */
    getView : function(){
        if(!this.view){
            this.view = new Ext.grid.GridView(this.viewConfig);
        }
        return this.view;
    },
    
/**
     * Called to get grid's drag proxy text, by default returns this.ddText.
     * @return {String} The text
     */
    getDragDropText : function(){
        var count = this.selModel.getCount();
        return String.format(this.ddText, count, count == 1 ? '' : 's');
    }

    
/** 
     * @cfg {String/Number} activeItem 
     * @hide 
     */
    
/** 
     * @cfg {Boolean} autoDestroy 
     * @hide 
     */
    
/** 
     * @cfg {Object/String/Function} autoLoad 
     * @hide 
     */
    
/** 
     * @cfg {Boolean} autoWidth 
     * @hide 
     */
    
/** 
     * @cfg {Boolean/Number} bufferResize 
     * @hide 
     */
    
/** 
     * @cfg {String} defaultType 
     * @hide 
     */
    
/** 
     * @cfg {Object} defaults 
     * @hide 
     */
    
/** 
     * @cfg {Boolean} hideBorders 
     * @hide 
     */
    
/** 
     * @cfg {Mixed} items 
     * @hide 
     */
    
/** 
     * @cfg {String} layout 
     * @hide 
     */
    
/** 
     * @cfg {Object} layoutConfig 
     * @hide 
     */
    
/** 
     * @cfg {Boolean} monitorResize 
     * @hide 
     */
    
/** 
     * @property items 
     * @hide 
     */
    
/** 
     * @method add 
     * @hide 
     */
    
/** 
     * @method cascade 
     * @hide 
     */
    
/** 
     * @method doLayout 
     * @hide 
     */
    
/** 
     * @method find 
     * @hide 
     */
    
/** 
     * @method findBy 
     * @hide 
     */
    
/** 
     * @method findById 
     * @hide 
     */
    
/** 
     * @method findByType 
     * @hide 
     */
    
/** 
     * @method getComponent 
     * @hide 
     */
    
/** 
     * @method getLayout 
     * @hide 
     */
    
/** 
     * @method getUpdater 
     * @hide 
     */
    
/** 
     * @method insert 
     * @hide 
     */
    
/** 
     * @method load 
     * @hide 
     */
    
/** 
     * @method remove 
     * @hide 
     */
    
/** 
     * @event add 
     * @hide 
     */
    
/** 
     * @event afterLayout 
     * @hide 
     */
    
/** 
     * @event beforeadd 
     * @hide 
     */
    
/** 
     * @event beforeremove 
     * @hide 
     */
    
/** 
     * @event remove 
     * @hide 
     */



    
/**
     * @cfg {String} allowDomMove  @hide
     */
    
/**
     * @cfg {String} autoEl @hide
     */
    
/**
     * @cfg {String} applyTo  @hide
     */
    
/**
     * @cfg {String} autoScroll  @hide
     */
    
/**
     * @cfg {String} bodyBorder  @hide
     */
    
/**
     * @cfg {String} bodyStyle  @hide
     */
    
/**
     * @cfg {String} contentEl  @hide
     */
    
/**
     * @cfg {String} disabledClass  @hide
     */
    
/**
     * @cfg {String} elements  @hide
     */
    
/**
     * @cfg {String} html  @hide
     */
    
/**
     * @cfg {Boolean} preventBodyReset
     * @hide
     */
    
/**
     * @property disabled
     * @hide
     */
    
/**
     * @method applyToMarkup
     * @hide
     */
    
/**
     * @method enable
     * @hide
     */
    
/**
     * @method disable
     * @hide
     */
    
/**
     * @method setDisabled
     * @hide
     */
});
Ext.reg('grid', Ext.grid.GridPanel);




/**
 * @class Ext.grid.EditorGridPanel
 * @extends Ext.grid.GridPanel
 * 

This class extends the {@link Ext.grid.GridPanel GridPanel Class} to provide cell editing
 * on selected {@link Ext.grid.Column columns}. The editable columns are specified by providing
 * an {@link Ext.grid.ColumnModel#editor editor} in the {@link Ext.grid.Column column configuration}.

 * 

Editability of columns may be controlled programatically by inserting an implementation
 * of {@link Ext.grid.ColumnModel#isCellEditable isCellEditable} into the
 * {@link Ext.grid.ColumnModel ColumnModel}.

 * 

Editing is performed on the value of the field specified by the column's
 * {@link Ext.grid.ColumnModel#dataIndex dataIndex} in the backing {@link Ext.data.Store Store}
 * (so if you are using a {@link Ext.grid.ColumnModel#setRenderer renderer} in order to display
 * transformed data, this must be accounted for).

 * 

If a value-to-description mapping is used to render a column, then a {@link Ext.form.Field#ComboBox ComboBox}
 * which uses the same {@link Ext.form.Field#valueField value}-to-{@link Ext.form.Field#displayFieldField description}
 * mapping would be an appropriate editor.

 * If there is a more complex mismatch between the visible data in the grid, and the editable data in
 * the {@link Edt.data.Store Store}, then code to transform the data both before and after editing can be
 * injected using the {@link #beforeedit} and {@link #afteredit} events.
 * @constructor
 * @param {Object} config The config object
 * @xtype editorgrid
 */
Ext.grid.EditorGridPanel = Ext.extend(Ext.grid.GridPanel, {
    
/**
     * @cfg {Number} clicksToEdit
     * 

The number of clicks on a cell required to display the cell's editor (defaults to 2).

     * 

Setting this option to 'auto' means that mousedown on the selected cell starts
     * editing that cell.

     */
    clicksToEdit: 2,
    
    
/**
    * @cfg {Boolean} forceValidation
    * True to force validation even if the value is unmodified (defaults to false)
    */
    forceValidation: false,

    // private
    isEditor : true,
    // private
    detectEdit: false,

        
/**
         * @cfg {Boolean} autoEncode
         * True to automatically HTML encode and decode values pre and post edit (defaults to false)
         */
        autoEncode : false,

        
/**
         * @cfg {Boolean} trackMouseOver @hide
         */
    // private
    trackMouseOver: false, // causes very odd FF errors

    // private
    initComponent : function(){
        Ext.grid.EditorGridPanel.superclass.initComponent.call(this);

        if(!this.selModel){
            
/**
             * @cfg {Object} selModel Any subclass of AbstractSelectionModel that will provide the selection model for
             * the grid (defaults to {@link Ext.grid.CellSelectionModel} if not specified).
             */
            this.selModel = new Ext.grid.CellSelectionModel();
        }

        this.activeEditor = null;

            this.addEvents(
            
/**
             * @event beforeedit
             * Fires before cell editing is triggered. The edit event object has the following properties 

             * 


    *              * grid - This grid

    *              * record - The record being edited

    *              * field - The field name being edited

    *              * value - The value for the field being edited.

    *              * row - The grid row index

    *              * column - The grid column index

    *              * cancel - Set this to true to cancel the edit or return false from your handler.

                   * 


             * @param {Object} e An edit event (see above for description)
             */
            "beforeedit",
            
/**
             * @event afteredit
             * Fires after a cell is edited. The edit event object has the following properties 

             * 


    *              * grid - This grid

    *              * record - The record being edited

    *              * field - The field name being edited

    *              * value - The value being set

    *              * originalValue - The original value for the field, before the edit.

    *              * row - The grid row index

    *              * column - The grid column index

                   * 


             *
             * 

 
grid.on('afteredit', afterEdit, this );

function afterEdit(e) {
    // execute an XHR to send/commit data to the server, in callback do (if successful):
    e.record.commit();
}; 
             * 


             * @param {Object} e An edit event (see above for description)
             */
            "afteredit",
            
/**
             * @event validateedit
             * Fires after a cell is edited, but before the value is set in the record. Return false
             * to cancel the change. The edit event object has the following properties 

             * 


    *              * grid - This grid

    *              * record - The record being edited

    *              * field - The field name being edited

    *              * value - The value being set

    *              * originalValue - The original value for the field, before the edit.

    *              * row - The grid row index

    *              * column - The grid column index

    *              * cancel - Set this to true to cancel the edit or return false from your handler.

                   * 


             * Usage example showing how to remove the red triangle (dirty record indicator) from some
             * records (not all).  By observing the grid's validateedit event, it can be cancelled if
             * the edit occurs on a targeted row (for example) and then setting the field's new value
             * in the Record directly:
             * 

 
grid.on('validateedit', function(e) {
  var myTargetRow = 6;
 
  if (e.row == myTargetRow) {
    e.cancel = true;
    e.record.data[e.field] = e.value;
  }
});
             * 


             * @param {Object} e An edit event (see above for description)
             */
            "validateedit"
        );
    },

    // private
    initEvents : function(){
        Ext.grid.EditorGridPanel.superclass.initEvents.call(this);

        this.on("bodyscroll", this.stopEditing, this, [true]);
        this.on("columnresize", this.stopEditing, this, [true]);

        if(this.clicksToEdit == 1){
            this.on("cellclick", this.onCellDblClick, this);
        }else {
            if(this.clicksToEdit == 'auto' && this.view.mainBody){
                this.view.mainBody.on("mousedown", this.onAutoEditClick, this);
            }
            this.on("celldblclick", this.onCellDblClick, this);
        }
    },

    // private
    onCellDblClick : function(g, row, col){
        this.startEditing(row, col);
    },

    // private
    onAutoEditClick : function(e, t){
        if(e.button !== 0){
            return;
        }
        var row = this.view.findRowIndex(t);
        var col = this.view.findCellIndex(t);
        if(row !== false && col !== false){
            this.stopEditing();
            if(this.selModel.getSelectedCell){ // cell sm
                var sc = this.selModel.getSelectedCell();
                if(sc && sc[0] === row && sc[1] === col){
                    this.startEditing(row, col);
                }
            }else{
                if(this.selModel.isSelected(row)){
                    this.startEditing(row, col);
                }
            }
        }
    },

    // private
    onEditComplete : function(ed, value, startValue){
        this.editing = false;
        this.activeEditor = null;
        ed.un("specialkey", this.selModel.onEditorKey, this.selModel);
                var r = ed.record;
        var field = this.colModel.getDataIndex(ed.col);
        value = this.postEditValue(value, startValue, r, field);
        if(this.forceValidation === true || String(value) !== String(startValue)){
            var e = {
                grid: this,
                record: r,
                field: field,
                originalValue: startValue,
                value: value,
                row: ed.row,
                column: ed.col,
                cancel:false
            };
            if(this.fireEvent("validateedit", e) !== false && !e.cancel && String(value) !== String(startValue)){
                r.set(field, e.value);
                delete e.cancel;
                this.fireEvent("afteredit", e);
            }
        }
        this.view.focusCell(ed.row, ed.col);
    },

    
/**
     * Starts editing the specified for the specified row/column
     * @param {Number} rowIndex
     * @param {Number} colIndex
     */
    startEditing : function(row, col){
        this.stopEditing();
        if(this.colModel.isCellEditable(col, row)){
            this.view.ensureVisible(row, col, true);
            var r = this.store.getAt(row);
            var field = this.colModel.getDataIndex(col);
            var e = {
                grid: this,
                record: r,
                field: field,
                value: r.data[field],
                row: row,
                column: col,
                cancel:false
            };
            if(this.fireEvent("beforeedit", e) !== false && !e.cancel){
                this.editing = true;
                var ed = this.colModel.getCellEditor(col, row);
                if(!ed){
                    return;
                }
                if(!ed.rendered){
                    ed.render(this.view.getEditorParent(ed));
                }
                (function(){ // complex but required for focus issues in safari, ie and opera
                    ed.row = row;
                    ed.col = col;
                    ed.record = r;
                    ed.on("complete", this.onEditComplete, this, {single: true});
                    ed.on("specialkey", this.selModel.onEditorKey, this.selModel);
                    
/**
                     * The currently active editor or null
                      * @type Ext.Editor
                     */
                    this.activeEditor = ed;
                    var v = this.preEditValue(r, field);
                    ed.startEdit(this.view.getCell(row, col).firstChild, v === undefined ? '' : v);
                }).defer(50, this);
            }
        }
    },

    // private
    preEditValue : function(r, field){
        var value = r.data[field];
        return this.autoEncode && typeof value == 'string' ? Ext.util.Format.htmlDecode(value) : value;
    },

    // private
        postEditValue : function(value, originalValue, r, field){
                return this.autoEncode && typeof value == 'string' ? Ext.util.Format.htmlEncode(value) : value;
        },

    
/**
     * Stops any active editing
     * @param {Boolean} cancel (optional) True to cancel any changes
     */
    stopEditing : function(cancel){
        if(this.activeEditor){
            this.activeEditor[cancel === true ? 'cancelEdit' : 'completeEdit']();
        }
        this.activeEditor = null;
    }
});
Ext.reg('editorgrid', Ext.grid.EditorGridPanel);

