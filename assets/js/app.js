
function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
}

//==========================================Declaration des structures==========================
function EnteteTObVCb(nb,taillemax) {
    this.NB=nb;
    this.TailleMax=taillemax;
    let a=((250-2*taillemax-2)/taillemax);

}

EnteteTObVCb.prototype={
    constructor :EnteteTObVCb,
    Entete:function (i) {
        var a;
        if (i===1){
            a=this.NB;
        }
        else if (i===2){
            a=this.TailleMax;
        }
        return a;
    },
    Aff_entete:function (i,val) {
        if (i===1){
            this.NB=val;
        }
        else if (i===2){
            this.TailleMax=val;
        }

    },
};

function TenregTObVCb(taille,eff,cle,chaine) {
    this.Taille=taille;
    this.eff=eff;
    this.cle=cle;
    this.chaine=chaine;
}
TenregTObVCb.prototype={
    constructor:TenregTObVCb
};
function TblocTObVCb(tab,derniercasevide,nbrenreg) {
    this.tab=tab;
    this.derniercasevide=derniercasevide;
    this.nbrenreg=nbrenreg;

}
TblocTObVCb.prototype={
 constructor:TblocTObVCb,

};
//==========================================================classe animations========================
function animations() {

}
animations.prototype={
  constructor:animations(),
  animeblockdown:function (nmrdublock) {
      anime({
           targets:document.getElementById('block'+(nmrdublock+1)),
           translateY:200,
           translateX:0,
          duration:1000,
          easing:'linear'
       });
  },
  animeblockup:function (nmrdublock) {
      anime({
          targets:document.getElementById('block'+(nmrdublock+1)),
          translateY:20,
          translateX: 0,
          duration:1000,
          easing: 'linear'
      });
  },
    animereplaceblock:function(nmrdublockARemplacer,nmrDuBlockRemplacent){
      let remplacent=document.getElementById('block'+(nmrDuBlockRemplacent+1));
      anime({
          targets:remplacent,
          translateY:[{value:200,duration:500},
              {value: 20,duration: 500}
          ],
          translateX:[{value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500},
              {value:(270*(nmrdublockARemplacer-nmrDuBlockRemplacent)),duration:500}
          ]

      });
    },
    animenreg:function (nmrDuBlock,nmrEnreg,color) {
        let a=document.getElementById('enreg'+(nmrEnreg+1)+'block'+(nmrDuBlock+1));
        anime({
            targets:a,
            width:[{value:21 ,duration:500},
                {value: 20}
            ],
            height:[{value:21,duration:500},
                {value: 20}],
            backgroundColor:[{value:color,
            duration:500,},
                {
                    value: '#ffffff'
                }]
        })

    },
    anime_border_enreg:function (nmrBlock,nmrEnreg,borderColor) {
      anime({
          targets:'enreg'+(nmrEnreg+1)+'block'+(nmrBlock+1),
          borderTopColor:borderColor,
      });
    }
};
//==========================================================classe fichier===========================

function TObVCb(Tab,entete,nomfich) {
    this.tab=Tab;
    this.Entete=entete;
    this.nomfich=nomfich;
}

TObVCb.prototype={
  constructor:TObVCb,
    liredir:function (i) {

        return this.tab[i];
    },
    ecriredir:function (i,buf) {
      this.tab[i]=buf;

    },
    aff_entete:function (i,val) {
        this.Entete.Aff_entete(i,val);
    },
    entete:function (i)
    {
        return  this.Entete.Entete(i);
    },
    alloc_bloc:function () {
      let divfichier=document.getElementById('TObVCb');
      let divblock=document.createElement('div');
      divblock.id='block'+(this.entete(1)+2);
      divblock.className='Tblock';
      divfichier.appendChild(divblock);
      for (let i=1;i<=this.entete(2);i++){
          let divenreg=document.createElement('div');
          divenreg.id='enreg'+i+'block'+(this.entete(1)+2);
          divenreg.className='Tenreg';
          divblock.appendChild(divenreg);
      }
      let divtaille=document.createElement('div');
      divtaille.className='casevide';
      divtaille.id='casevide'+(this.entete(1)+2);
      divtaille.innerHTML='<P>0</p>';
      divblock.appendChild(divtaille);
        return this.entete(1)+1;
    },

    remplacer_block:function(nmrDublockAremplacer,nmrDublockRemplacent){
        let remplacent=document.getElementById('block'+(nmrDublockRemplacent+1));
        let aremplacer=document.getElementById('block'+(nmrDublockAremplacer+1));
        aremplacer.parentNode.replaceChild(remplacent,aremplacer);
        remplacent.id='block'+(nmrDublockAremplacer+1);
        for (let i=1;i<=this.entete(2);i++){
            let divenreg=document.getElementById('enreg'+i+'block'+(nmrDublockRemplacent+1));
            divenreg.id='enreg'+i+'block'+(nmrDublockAremplacer+1);
            divenreg.className='Tenreg';
        }
        },

    insererenreg:async function(e,buf,k){
      let anime = new animations();
      let color='#ff0';
      let a=buf.derniercasevide;
      k++;

      buf.tab[a]=e.Taille;

      buf.tab[a+1]=e.eff;

      buf.tab[a+2]=e.cle;

      let divblock0=document.getElementById('enreg'+(a+1)+'block'+k);

      let divblock1=document.getElementById('enreg'+(a+2)+'block'+k);

      let divblock2=document.getElementById('enreg'+(a+3)+'block'+k);

        anime.animenreg(k-1,a,color);
        await sleep(200);
        divblock0.style.borderColor='#193ded';
        divblock0.style.borderWidth='2px';
      divblock0.innerHTML+='<p>'+e.Taille+'</p>';
        await sleep(300);
        anime.animenreg(k-1,a+1, color);
        await sleep(200);
        divblock1.style.borderColor='#ed6658';
        divblock1.style.borderWidth='2px';
      divblock1.innerHTML+='<p>'+e.eff+'</p>';
        await sleep(300);
        anime.animenreg(k-1,a+2,color);
        await sleep(200);
        divblock2.style.borderColor='#1e9611';
        divblock2.style.borderWidth='2px';
      divblock2.innerHTML+='<p>'+e.cle+'</p>';
        await sleep(300);

      for (let i=1;i<=e.chaine.length;i++){
          buf.tab[a+2+i]=e.chaine[i-1];
          let divblocki=document.getElementById('enreg'+(a+i+3)+'block'+k);
          anime.animenreg(k-1,a+i+2,color);
          await sleep(200);
          divblocki.style.borderWidth='2px';
          divblocki.innerHTML+='<p>'+e.chaine[i-1]+'</p>';
          await sleep(300);
      }
      document.getElementById('casevide'+k).innerHTML='<p>'+(a+e.Taille)+'</p>';
    },

    insertion:async function (cle,enreg) {
      let e;
      let anime =new animations();
      let buf;
      let t=(enreg.length)+3;
      e=new TenregTObVCb(t,0,cle,enreg);
      let i=0,nb=this.entete(1),insere=false,taillemax=this.entete(2);
      while (i<=nb && !insere)
      {
         buf= this.liredir(i);
          anime.animeblockdown(i);
          await sleep(1500);
         if (buf==null){buf=new TblocTObVCb([],0,0);
         this.aff_entete(1,i);
         }

         if ((taillemax - buf.derniercasevide)>=t){
            await this.insererenreg(e,buf,i);
            buf.derniercasevide= buf.tab.length;
            insere=true;
              this.ecriredir(i,buf);
              anime.animeblockup(i);
             await sleep(1000);
         }
         else {
              anime.animeblockup(i);
             await sleep(1000);
             i++;
         }

      }
      if (!insere){
          let n=this.alloc_bloc();
          buf=new TblocTObVCb([],0,0);
          anime.animeblockdown(n);
          await sleep(1500);
          await this.insererenreg(e,buf,n);
          anime.animeblockup(n);
          await sleep(1500);
          buf.derniercasevide=t;
          this.aff_entete(1,nb+1);
          this.ecriredir(n,buf);
      }
    },
    initialisation:async function (nbrelemntAinserer) {

        let tab=[];
        let initialise=0;

        while (initialise<nbrelemntAinserer){
            let enreg=prompt('entrez l enregistrement '+(initialise+1));
            tab[initialise]=enreg;
            initialise++;
        }
        initialise=0;
        this.alloc_bloc();
        this.aff_entete(1,0);
        while (initialise<nbrelemntAinserer){
            let enreg=tab[initialise];
            await this.insertion(initialise+1,enreg);
            initialise++;
        }
    },
    recherche:async function (cle) {
      var anime=new animations();
        let i=0,j=0,trouv=false;
        let buf;
        let nbloc=this.entete(1);
        while ((i<=nbloc) &&(!trouv)){
            j=0;
            buf=this.liredir(i);
            anime.animeblockdown(i);
            await sleep(1500);
            while ((j<buf.derniercasevide) && (!trouv)){
                let taille=buf.tab[j];
                anime.animenreg(i,j,'#597caa');
                await sleep(300);
                let eff=buf.tab[j+1];
                let kle=buf.tab[j+2];
                console.log('lklkl');

                if ((kle==cle) && (!eff)){
                    trouv=true;
                    anime.animenreg(i,j+2,'#1e9611');
                    await sleep(500);
                }
                else {
                    anime.animenreg(i,j+2,'#963133');
                    await sleep(300);
                    anime.animenreg(i,j,'#ffffff');
                    anime.animenreg(i,j+2,'#ffffff');
                    j+=taille;

                }

            }
            anime.animeblockup(i);
            await (1000);
            if (!trouv)
            {
                i++;
                j=0;
            }

        }
        return [trouv,i,j];
    },
    clear_dernier_bloc(){
      let r=this.entete(1);
      let div=document.getElementById('block'+(r+1));
      div.parentNode.removeChild(div);
    },
    clear_enregs_div:async function(nmrBlock,indiceDebut,indiceFin){
      for (let i=indiceFin;i>=indiceDebut;i--){
          document.getElementById('enreg'+(i+1)+'block'+(nmrBlock+1)).innerHTML='';
          await sleep(200);
      }
    },
    suppression:async function (cle) {
      var anim=new animations();
      let a=await this.recherche(cle);
      let buf;
      let trouv=a[0],i=a[1],j=a[2];
      if (trouv){
          nb=this.entete(1);
          buf=this.liredir(i);
          anim.animeblockdown(i);
          await sleep(1000);
          let taille=buf.tab[j];
          if (buf.derniercasevide==taille){
              if (nb==i){
                  this.clear_dernier_bloc();
                  this.aff_entete(1,nb-1);
              }
              else {
                  buf=this.liredir(nb);
                   anim.animereplaceblock(i,nb);
                  document.getElementById('block'+(i+1)).style.opacity=0;
                   await sleep(300);

                   await sleep(700);

                  this.ecriredir(i,buf);
                  this.remplacer_block(i,nb);
                  anime({
                      targets:document.getElementById('block'+(i+1)),
                      translateX:0,
                      easing:'linear',
                      duration:0
                  });
                  document.getElementById('casevide'+(nb+1)).id='casevide'+(i+1);

                  this.aff_entete(1,nb-1);
              }
          }
          else {
              if ((taille+j)==buf.derniercasevide){
                  buf.derniercasevide=j;
                  this.clear_enregs_div(i,j,j+taille-1);
                  document.getElementById('casevide'+(i+1)).innerHTML='<p>'+j+'</p>';
                  await sleep(200);
                  anim.animeblockup(i);
                  await sleep(1000);
              }
              else {
                  let s=j;
                  for (let l=j+taille;l<buf.derniercasevide;l++)
                  {
                      buf.tab[s]=buf.tab[l];
                      document.getElementById('enreg'+(s+1)+'block'+(i+1)).innerHTML='<p>'+buf.tab[s]+'</p>';
                      await sleep(200);
                      s++;
                  }
                  this.clear_enregs_div(i,s,buf.derniercasevide-1);
                  buf.derniercasevide-=taille;
                  anim.animeblockup(i);
                  document.getElementById('casevide'+(i+1)).innerHTML='<p>'+buf.derniercasevide+'</p>';
              }
          }
      }

    }

};
var entetee =new EnteteTObVCb(-1,10);
var fichier=new TObVCb([],entetee,'test');
var initialiseee=false;
// fichier.initialisation(3);
 function init() {
    if (!initialiseee) {
        let a = prompt('le nombre d elemnt a inserer');
        fichier.initialisation(3);
        initialiseee=true;
    }
    else{
        alert('le fichier est deja initialise');
    }

}
function insere() {
    if (initialiseee){
        let s=prompt("Veuillez tapez l'enregitrement a inserer:");
        let a=prompt('Veuillez tapez sa cle:');
        fichier.insertion(a,s);
    }
    else {
        alert("Le fichier n'est pas initialise");
    }
}
function rech() {
    if (initialiseee){
        let a=prompt('Veuillez tapez la cle a rechercher:');
        fichier.recherche(a);
    }
    else {
        alert("Le fichier n'est pas initialise");
    }
}
function supp() {
    if (initialiseee){
        let s=prompt("Veuillez tapez l'enregitrement a supprimer:");

        fichier.suppression(s);
    }
    else {
        alert("Le fichier n'est pas initialise");
    }

}

document.getElementById('inserer').onclick=insere;
document.getElementById('rechercher').onclick=rech;
document.getElementById('supprimer').onclick=supp;
document.getElementById('initialiser').onclick=init;

