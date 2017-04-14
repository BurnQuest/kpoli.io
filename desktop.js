//var LOCAL_LIGHT = '#EDEEC0';
var LOCAL_LIGHT = '#D9CEB1';
var LOCAL_DARK = '#33312E';

var width = window.innerWidth;
var height = window.innerHeight;


function init() {
    var stage = new Konva.Stage({
        container: 'responsive-canvas',
        width: width,
        height: height,

    });

    window.addEventListener("resize", handleResize);

    var rectX = stage.getWidth() / 2 - 50;
    var rectY = stage.getHeight() / 2 - 25;
    var dockX = stage.getWidth() / 2 - 300;
    var dockY = stage.getHeight() - 70;
    //for winds
    var DEFAULT_WIDTH = 600;


    var startorb = new Konva.Group({
        x: 20,
        y: 15,


    });
    var systray = new Konva.Group({
      x: 0,
      y: 0,
    });
    var trayLabel = new Konva.Label({
        x: 65,
        y: 16,
    });
    trayLabel.add(new Konva.Tag({

        height: 10,
        fill: LOCAL_LIGHT,
        pointerWidth: 15,
        pointerHeight: 23,
        stroke: LOCAL_DARK,
        lineJoin: 'round'
    }));
    trayLabel.add(new Konva.Text({
        name: 'text',
        text: 'Tray Application',
        fontFamily: 'Courier',
        fontStyle: 'italic',
        fontSize: 12,
        padding: 5,
        fill: LOCAL_DARK
    }));
    var trayStack = [];








    for (i = 0; i < 2; i++) {
        var tile = new Konva.Rect({
            name: 'tile_'.concat(toString(i)),
            x: (i == 0) || (i == 4) ? 10 : 15,
            y: (i == 1) ? 9 : 4,
            width: (i == 1) ? 18 : 10,
            height: (i == 1) ? 12 : 10,
            fill: LOCAL_DARK,
            stroke: LOCAL_LIGHT,
            strokeWidth: 1.6,


        });
        startorb.add(tile);
    }




    var taskbar = new Konva.Rect({
        y: 15,
        x: 20,
        width: stage.getWidth() - 30,
        height: 25,
        fill: LOCAL_DARK,
    });


    var dockGroup = new Konva.Group();
    var dock = new Konva.Shape({
        sceneFunc: function(context) {
            context.beginPath();
            context.moveTo(60, 50);
            context.lineTo(700, 50);
            context.lineTo(600, 10);
            context.lineTo(0, 10);
            context.closePath();
            // Konva specific method
            context.fillStrokeShape(this);
        },
        name: 'dock',
        x: dockX,
        y: dockY,
        width: 900,
        height: 60,
        fill: LOCAL_DARK,
        cornerRadius: 4,
        shadowColor: LOCAL_DARK,
        shadowBlur: 70,
        shadowOffset: {
            x: 10,
            y: 10
        },
        shadowOpacity: 0.5,

    });

    var icon = new Konva.Rect({
        x: dockX + 80,
        y: dockY - 20,
        fill: LOCAL_LIGHT,
        width: 50,
        height: 50,
        stroke: LOCAL_DARK,
    });
    dockGroup.add(dock);
    dockGroup.add(icon);

    var backing = new Konva.Rect({
        name: 'windowbacking',
        x: rectX,
        y: rectY,
        width: DEFAULT_WIDTH,
        height: 300,
        fill: LOCAL_LIGHT,
        stroke: LOCAL_DARK,
        strokeWidth: 2,
        cornerRadius: 1,
        shadowColor: LOCAL_DARK,
        shadowBlur: 70,
        shadowOffset: {
            x: 10,
            y: 10
        },
        shadowOpacity: 0.5,


    });


    var bar = new Konva.Rect({
        name: 'menubar',
        x: rectX,
        y: rectY,
        width: DEFAULT_WIDTH,
        height: 21,
        fill: LOCAL_DARK,


    });



    var labeltext = new Konva.Text({
        name: 'label',
        x: rectX,
        y: rectY,
        width: DEFAULT_WIDTH,
        text: 'loremipsum',
        wrap: 'word',
        align: 'center',
        fontSize: 12,
        fontFamily: 'Courier',
        fill: LOCAL_LIGHT,
        padding: 4,
    });

    var bodytext = new Konva.Text({
        name: 'body',
        x: rectX,
        y: rectY + 30,
        width: DEFAULT_WIDTH,
        wrap: 'word',
        align: 'center',
        text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSoftware | Film | Animation',
        fontSize: 15,
        fontFamily: 'Helvetica',
        fontStyle: 'italic',
        fontWeight: 'light',
        fill: LOCAL_DARK,
        padding: 7,
    });

    var dashmax = new Konva.Rect({
        name: 'dashmax',
        width: 5,
        height: 5,
        x: rectX + 580,
        y: rectY + 8,
        fill: LOCAL_DARK,
        padding: 7,
        stroke: LOCAL_LIGHT,

    });
    var dashmin = new Konva.Rect({
        name: 'dashmin',
        width: 5,
        height: 1,
        x: rectX + 555,
        y: rectY + 12,
        fill: LOCAL_DARK,
        padding: 9,
        stroke: LOCAL_LIGHT,

    });



    var wind = new Konva.Group({
        x: 120,
        y: 40,
        draggable: true
    });



    var startpage = wind.clone();

    var highlight = new Konva.Rect({
        x: startpage.getWidth() / 2,
        y: startpage.getHeight() / 2,
        width: startpage.getWidth() / 2,
        height: startpage.getHeight() / 2,
        fill: LOCAL_DARK,
    });
    startpage.add(highlight);

    var windlayer = new Konva.Layer();
    var tasklayer = new Konva.Layer();
    var docklayer = new Konva.Layer();
    var draglayer = new Konva.Layer();

    wind.add(backing);
    wind.add(bar);
    wind.add(labeltext);
    wind.add(bodytext);
    wind.add(dashmax);
    wind.add(dashmin);


    dashmin.on('click', function(evt) {
      var period = 2000;
      var fade = new Konva.Animation(function(frame) {
        var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
        // scale x and y
        evt.target.getParent().scale({ x :scale, y : scale});

        }, windlayer);
        fade.start();




        trayStack.push(evt.target.getParent());
        //evt.target.getParent().hide();
        stage.draw();

        trayUpdate(trayStack);
    });


    var allWindows = new Set();
    var sizes = [
        [400, 400],
        [600, 300],
        [200, 500],
        [600, 350]
    ];
    var labelfills = ['Experience', 'Software Proficiencies', 'Language Skills', 'LanguageSkills'];
    var textfills = [
        'TradeAssist- \n Comercial Photography \nWCPR- Castle Point Radio \n', 'sure', 'ok', '>_\n| Python- Web, Visual Art, math\n| C/C++- Useful bash utilities and algorithm implementation\n| JavaScript- For HTML5 Canvas\n| HTML5 & CSS3- Creating useful websites with a focus on interface design\n| LaTeX- Typesetting for math and statistics\n '
    ];

    for (var i = 0; i < 4; i++) {
        //anonymous function for scoping, this tricked me for a while
        (function() {
            var wind2 = wind.clone({
                x: -window.innerWidth / 2 + 50 * i,
                y: -window.innerHeight / 2 + +250 + 50 * i,
                id: i.toString(),
            });
            wind2.find('.label').setAttr('text', labelfills[i]);
            wind2.find('.body').setAttrs({
                text: textfills[i],
                align: 'left',

            });
            resizeWindow(wind2, sizes[i][0], sizes[i][1]);
            //faux terminal window
            if (i == 3) {
                wind2.find('.windowbacking').setAttrs({
                    opacity: 0.9,
                    fill: LOCAL_DARK,
                    stroke: LOCAL_DARK,
                    strokeWidth: 2,

                });

                wind2.find('.body').setAttrs({
                    opacity: 0.5,
                    fill: LOCAL_LIGHT,
                    fontSize: 18,
                    fontWeight: 'light',
                    lineHeight: 1.2,

                });
                wind2.find('.menubar').setAttrs({
                    opacity: 0.1,
                    shadowColor: 'black',
                    shadowBlur: 70,
                    shadowOffset: {
                        x: 2,
                        y: 2
                    },
                    shadowOpacity: 0.0,
                });




            }
            //add to various layers and the set of all windows now that look is finalized
            allWindows.add(wind2);
            windlayer.add(wind2);
            wind2.cache();


            //window dragging functionality
            wind2.on('dragstart', function() {
                wind2.moveTo(draglayer);
                wind2.moveToTop();
                wind2.setAttr('opacity', 0.2);
                stage.draw();
            });

            wind2.on('dragend', function() {
                wind2.setAttr('opacity', 1);
                stage.draw();
            });
        })();



    }

    // commit layers to stage in order

    tasklayer.add(taskbar);
    tasklayer.add(startorb);
    tasklayer.add(systray);

    docklayer.add(dockGroup);


    stage.add(docklayer);
    stage.add(windlayer);
    stage.add(draglayer);
    stage.add(tasklayer);

    function tileWindows() {


    }


    function resizeWindow(node, xsize, ysize) {
        var prevWidth = node.findOne('.menubar').getWidth();
        node.find('.dashmin').move({
            x: -(prevWidth - xsize)
        });
        node.find('.dashmax').move({
            x: -(prevWidth - xsize)
        });
        node.find('.windowbacking').setAttrs({
            width: xsize,
            height: ysize,
        });
        node.find('.menubar').setAttrs({
            width: xsize,
        });
        node.find('.body').setAttrs({
            width: xsize,
            height: ysize,
        });
        node.find('.label').setAttrs({
            width: xsize,
            height: ysize,
        });


    }
    //removes a given element from an array
    function remove(array, element) {
        const index = array.indexOf(element);
        array.splice(index, 1);
    }
    //updates and redraws the system tray using the current stack of minimized nodes
    function trayUpdate(traynodes) {
      var labelStack = [];

        systray.destroyChildren();


        for (var i = 0; i < traynodes.length; i++) {
            var appLabel = trayLabel.clone({
              id: traynodes[i].getAttr('id'),
              opacity: 0.5 + 0.2*i
            });
            //appLabel.setAttr('id', traynodes[i].getAttr('id'));

            appLabel.find('.text').setAttr('text', traynodes[i].findOne('.label').getAttr('text'));


            labelStack.push(appLabel);
            appLabel.on('click', function(evt) {



                //if its in the set of all Windows, but its not in the system tray, redraw the window
                allWindows.forEach(function(node) {
                  //  if(node.getAttr('id') == appLabel.getAttr('id') && !node.isVisible()){
                      remove(trayStack,node);
                  //  }
                    if (trayStack.indexOf(node) == -1) {
                        node.show();
                        stage.draw();
                    }
                });
                trayUpdate(trayStack);
            });

            //count backwards through the stack of labels to get the total length of all previous labels
            var offset = 0;
            var j = i;
            while (j != 0) {
                offset += labelStack[j - 1].findOne('.text').getWidth();
                j--;
            }

            appLabel.move({
                x: (i == 0) ? 0 : offset
            });


            systray.add(appLabel);
        }

        tasklayer.draw();

    }


    //adds draw space to fit the window, makes taskbar and dock responsive
    function handleResize() {
        stage.setAttrs({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        taskbar.setAttr('width', stage.getWidth() - 30);

        dock.setAttrs({
            x: stage.getWidth() / 2 - 300,
            y: stage.getHeight() - 70,
        });
        dockX = stage.getWidth() / 2 - 300;
        dockY = stage.getHeight() - 70;
        icon.

        stage.draw();;
    }
}
