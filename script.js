// strings.containerTheme.classList.remove('containerzIndex');


const strings = {

    container : document.querySelector('.container'),
    perCount : document.querySelector('.percentCount'),
    proBar : document.querySelector('.progress-bar'),
    btns : document.querySelector('.btns'),
    headingTheme : document.querySelector('.h1-themes'),
    btnSrt : document.querySelector('.btnstart'),
    themeStngbtn : document.querySelector('.themeSetting'),
    images : document.querySelectorAll(".img"),
    containerTheme : document.querySelector('.container'),
    PianoTheme : document.querySelector('.Piano'),
    helpTog : document.querySelector('.helpToggle'),
    themeSettingArrow : document.querySelector('.downArrow'),
    body : document.querySelector('.body'),
    afterLoadTheme: document.querySelector('.after_load_theme')
}

/////////////////////////////////////////////////
            //// ALL Clear Stff (clear when app begain)
            
let functions = {
    
    clearBg: function() {    
        strings.body.classList.remove('bg1');   // drb.pbg (Main menu bckground)
        strings.body.classList.remove('bg2');   // bg.jpg (game background)
        strings.body.classList.remove('bgstng');  // setting bg   
        strings.body.classList.remove('bgTheme1');
        
    },
    
    
    clearImages: function() {
        strings.body.classList.remove('bg2');
        strings.body.classList.remove('bgTheme1');
        strings.body.classList.remove('bgTheme2');
        strings.body.classList.remove('bgTheme3'); 
    },
    
    clearContainer: function() {
        strings.containerTheme.classList.remove('containerTheme0');
        strings.containerTheme.classList.remove('containerTheme1');
        strings.containerTheme.classList.remove('containerTheme2');
        strings.containerTheme.classList.remove('containerTheme3');
    },
    
    
    clearPiano: function() {
        strings.PianoTheme.classList.remove('pianoTheme0');
        strings.PianoTheme.classList.remove('pianoTheme1');
        strings.PianoTheme.classList.remove('pianoTheme2');
        strings.PianoTheme.classList.remove('pianoTheme3');
    },
    
    clear_Img_Con_Pia: function() {
        functions.clearImages();
        functions.clearContainer();
        functions.clearPiano();
    },
    
}



//////////////////////////////// EventListner Container ///////////////////////////////////////

let eventListners = {
// 1. ///////////// Adding music when Piano keys clicked //////////////////////////////
    music: function() {
        for(let i = 0; i < 10; i++) {
            
            let keyclick;
            keyclick = document.querySelector(`.key${i}`);
            
            keyclick.addEventListener('mousedown', function() {
                document.querySelector(`.key${i}`).classList.add('keyActive');
                new Audio(`music/music${i}.mp3`).play();
                
            });

            document.addEventListener('keydown', function(event) {
                if(event.key == i) {
                    document.querySelector(`.key${i}`).classList.add('keyActive');              
                    // console.log(i);
                    new Audio(`music/music${i}.mp3`).play();
                }
            });

            document.addEventListener('keyup', function(event) {
                if(event.key == i) {
                    document.querySelector(`.key${i}`).classList.remove('keyActive');
                }
            });

    
            keyclick.addEventListener('mouseup', function() {
                document.querySelector(`.key${i}`).classList.remove('keyActive'); 
            })

            
        }
    
    },

    ////////////////////////// REMOVE after load black theme

    removeTheme: () => {

        for(let i = 0; i < 10; i++) {
            document.addEventListener('keypress', (event) =>{
                
                if(event.key == i) {
                    strings.afterLoadTheme.style.display = 'none';
                    strings.themeSettingArrow.style.display = 'inline-block';

                }
                
            })
        }

    },



    ////// i have created this cause i need this in diff palces, so to fallow Dry 
    firstLoad : function() {
        
        let percentBar = document.querySelector('.progress-bar');
        let pro = document.getElementById('progress');
        let percentage = document.getElementById('percentCount');
        let count = 5;
        let progress = 25;
        let stop = setInterval(frame,15)
        percentage.style.display = 'block';
        percentBar.style.display = 'block';
        document.querySelector('.btntest').style.display = 'none';
        function frame() {
            if(progress == 500 && count == 100 ) { // progress = 500, && count = 100;
                clearInterval(stop);

                eventListners.music();

                percentage.style.display = 'none';
                percentBar.style.display = 'none';
                functions.clear_Img_Con_Pia();
                functions.clearBg();
                strings.body.classList.add('bg2');
                strings.container.style.display = 'flex';
                strings.PianoTheme.classList.add('pianoTheme0');
                strings.containerTheme.classList.add('containerTheme0');
                // strings.themeSettingArrow.style.display = 'inline-block';
                showStff();
                strings.containerTheme.classList.add('containerTheme0');
                strings.themeStngbtn.style.display = 'inline-block';
                
                strings.afterLoadTheme.style.display = 'block';
                eventListners.removeTheme();

                /// if we call eventlistners.music function here and go in menu and come back again value increases

            } else {
                progress = progress + 5;
                count = count + 1;
                
                pro.style.width = progress + 'px';
                percentage.innerHTML = count + '%';               
            };

        };

    },

// 2. ////////////////// Loading and Showing stff when click on Play Btn /////////////////////
    load : function() {
        strings.btnSrt.addEventListener('click', function() {
            
            eventListners.firstLoad();

            let pop = document.querySelector('.popup');
            pop.style.display = 'none';
            strings.btnSrt.style.display = 'none';
            // eventListners.music();
            
        });
    },
    
    //// ceating this like this cause we want to call this function in two places and can not find a diff way right now
    afterClick : function() {
        document.querySelector('.helpToggle').classList.toggle('themeSelector');
        strings.containerTheme.classList.toggle('containerzIndex');
        strings.themeSettingArrow.classList.toggle('themeSetting__afClick');
        // document.querySelector('.downArrow').style.backgroundColor = 'white';
        

        for(let i = 0; i < strings.images.length; i++) {
            document.querySelector('.img'+i).classList.toggle('themeNoDisplay');
        }
        chooseImg();
    },

    /// calling the 'AfterClick' function when btn Arrow is clicked
    themeContainer: function() {
        strings.themeSettingArrow.addEventListener('click', () => {
            this.afterClick();
            strings.themeStngbtn.style.zIndex = '9999';
        });

        document.addEventListener('keydown', (event) => {
            if(event.keyCode == 40 || event.keyCode == 38) this.afterClick();
            // console.log(event)
        });



    },



}



////////////////////////////////////////////////////////////////////////////////////////////
////// Stff that we want to Hide and Edit when APP Starts, and when we Select Themes ////////////////

function hideStff() {
    
    strings.container.style.display = 'none';
    
    strings.perCount.style.display = 'none';
    strings.proBar.style.display = 'none';

    functions.clearBg(); 
    // document.body.style.backgroundImage = 'url(img/drb.png)';
    strings.body.classList.add('bg1');
    
    for(let i = 0; i < strings.images.length; i++) {
        document.querySelector('.img'+i).classList.remove('themeNoDisplay');
    }
    functions.clear_Img_Con_Pia();
    strings.helpTog.classList.remove('themeSelector');
    strings.themeStngbtn.style.display = 'none';
    strings.containerTheme.classList.remove('containerzIndex');
    
    strings.themeSettingArrow.classList.remove('themeSetting__afClick');
    strings.themeStngbtn.classList.remove('themeSettingAnimation');

    document.querySelector('.btntest').style.display = 'none';

    strings.afterLoadTheme.style.display = 'none';

    strings.themeSettingArrow.style.display = 'none';

    
}

/////////////////////  Stff that we want to Show and Hide after loading ///////////////////////

function showStff() {
    functions.clearBg();
    strings.body.classList.add('bg2');
    document.querySelector('.container').style.display = 'flex';
    
    strings.btns.style.display = 'none';
    // selectThem.style.display = 'block';
    eventListners.themeContainer();
    
    
}



/////////////////////////////////// Background Themes //////////////////////////////////
function chooseImg() {
    
    for(let i = 0; i < 4; i++) {
        let a = i;
        
        document.querySelector('.img' + a).addEventListener('click', function() {
            
            if(a === 1) {
                functions.clear_Img_Con_Pia();
                strings.body.classList.add('bgTheme1');
                strings.containerTheme.classList.add('containerTheme1');
                strings.PianoTheme.classList.add('pianoTheme1');
            } else if(a === 2) {
                functions.clear_Img_Con_Pia();
                strings.body.classList.add('bgTheme2');
                strings.containerTheme.classList.add('containerTheme2');
                strings.PianoTheme.classList.add('pianoTheme2');
            } else if(a === 3) {
                functions.clear_Img_Con_Pia();
                strings.body.classList.add('bgTheme3');
                strings.containerTheme.classList.add('containerTheme3');
                strings.PianoTheme.classList.add('pianoTheme3');
            } else if(a === 0) {
                functions.clear_Img_Con_Pia();
                strings.body.classList.add('bg2');
                strings.containerTheme.classList.add('containerTheme0');
                strings.PianoTheme.classList.add('pianoTheme0');
            }

        });
    }
}

////////////////////////////////  Calling The Functions /////////////////////////////////

hideStff();
eventListners.load();
