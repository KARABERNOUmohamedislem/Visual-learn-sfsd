
//==========================================Declaration des structures==========================
function EnteteTObVCb(nb,taillemax) {
    this.NB=nb;
    this.TailleMax=taillemax;
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
        return this.entete(1)+1;
    },
    insererenreg:function(e,buf){
      let a=buf.derniercasevide;
      buf.tab[a]=e.Taille;
      buf.tab[a+1]=e.eff;
      buf.tab[a+2]=e.cle;
      for (let i=1;i<=e.chaine.length;i++){
          buf.tab[a+2+i]=e.chaine[i-1];
      }
    },
    insertion:function (cle,enreg) {
      let e;
      let buf;
      let t=enreg.length+3;
      e=new TenregTObVCb(t,0,cle,enreg);
      let i=0,nb=this.entete(1),insere=false,taillemax=this.entete(2);
      while (i<=nb && !insere)
      {
         buf= this.liredir(i);
         if (buf==null){buf=new TblocTObVCb([],0,0);
         this.aff_entete(1,i);
         }
         if ((taillemax - buf.derniercasevide)>=t){
            this.insererenreg(e,buf);
            buf.derniercasevide+= t;
            insere=true;
            this.ecriredir(i,buf);
         }
         else {
             i++;
         }
      }
      if (!insere){
          let n=this.alloc_bloc();
          buf=new TblocTObVCb([],0,0);
          this.insererenreg(e,buf);
          buf.derniercasevide=t-1;
          this.aff_entete(1,nb+1);
          this.ecriredir(n,buf);
      }
    },
    initialisation:function (nbrelemntAinserer) {
        let e;
        let nbloc=0,initialise=0;
        let taillemax=this.entete(2);
        while (initialise<nbrelemntAinserer){
            let enreg=prompt('entrez l enregistrement '+(initialise+1));
            this.insertion(initialise+1,enreg);
            initialise++;
        }
    },
    recherche:function (cle) {
        let i=0,j=0,trouv=false;
        let buf;
        let nbloc=this.entete(1);
        while ((i<=nbloc) &&(!trouv)){
            j=0;
            buf=this.liredir(i);
            while ((j<buf.derniercasevide) && (!trouv)){
                let taille=buf.tab[j];
                let eff=buf.tab[j+1];
                let kle=buf.tab[j+2];
                if ((kle==cle) && (!eff)){
                    trouv=true;
                }
                else {
                    j+=taille;
                }
            }
            if (!trouv)
            {
                i++;
                j=0;
            }
        }
        return [trouv,i,j];
    },
    suppression:function (cle) {
      let a=this.recherche(cle);
      let buf;
      let trouv=a[0],i=a[1],j=a[2];
      if (trouv){
          nb=this.entete(1);
          buf=this.liredir(i);
          let taille=buf.tab[j];
          if (buf.derniercasevide==taille){
              if (nb==i){
                  this.aff_entete(1,nb-1)
              }
              else {
                  buf=this.liredir(nb);
                  this.ecriredir(i,buf);
                  this.aff_entete(1,nb-1);
              }
          }
          else {
              if ((taille+j-1)==buf.derniercasevide){
                  buf.derniercasevide=j;
              }
              else {
                  let s=j;
                  for (let l=j+taille;l<=buf.derniercasevide;l++)
                  {
                      buf.tab[s]=buf.tab[l];
                      s++;
                  }
                  buf.derniercasevide-=taille;
              }
          }
      }

    }

};
var entetee =new EnteteTObVCb(0,20);
var fichier=new TObVCb([],entetee,'test');
let a=prompt('le nombre d elemnt a inserer')
fichier.initialisation(a);
