let infoperso = {
    template: `
    <section id="infoPerso" class="conteneur flex">
    <div>
    <h2>{{info.nom}} {{info.prenom}}</h2>
    <p v-if="info.adresse">Adresse : {{info.adresse}} </p>
    <p v-if="age">Age : {{age}} ans</p>
    <p v-if="vehicule">Voiture : {{this.vehicule}} </p>
    </div>
    <div>
    <img :src="trombi" alt="photo de profil"/>
    </div>
</section>
    `,
    props: ['info', 'trombi'],
    computed: {
        vehicule: function () {
            if (this.info.car != undefined)
                return (this.info.car) ? 'oui' : 'non';
        },
        age: function () {
            if (this.info.ddn) {
                return Math.floor((new Date().getTime() - Date.parse(this.info.ddn)) / (1000 * 60 * 60 * 24 * 365.25));
            }
        }
    },
};

let formation = {
    template: `
    <section id="formation" class="conteneur">
    <h2>Formations</h2>
        <div class="formDetail" v-for="formation of formations">
            <h3>{{formation.nom}}</h3>
            <span>Du {{formation.dateDebut}} au {{formation.dateFin}}</span>
            <p v-html="formation.detail"></p>
        </div>
    </section>
    `,
    props: ['formations'],
};

let experiencepro = {
    template: `
    <section id="experience" class="conteneur">
    <h2>Expériences professionnelles</h2>
        <div class="exp" v-for="exp of experiences">
            <h3>{{exp.fonction}}</h3>
            <span>Du {{exp.dateDebut}} au {{exp.dateFin}}</span>
            <p>{{exp.detail}}</p>
        </div>
    </section>
    `,
    props: ['experiences'],
};

let competences = {
    template: `
        <section id="competences" class="conteneur">
        <h2>Compétences</h2>
            <ul>
                <li v-for="competence of competences">{{competence}}</li>
            </ul>
        </section>
    `,
    props: ['competences'],
};

let vm = new Vue({
    el: '#app',
    data: {
        nom: null,
        prenom: null,
        dateNaissance: null,
        adresse: null,
        phone: null,
        mail: null,
        url: null,
        car: null,
        intitule: null,
        formDateDebut: null,
        formDateFin: null,
        formDetail: null,
        formations: [],
        fonction: null,
        fctDateDebut: null,
        fctDateFin: null,
        expDetail: null,
        experiences: [],
        comp: null,
        competences: [],
        infoPerso: [],
        trombi: '',
    },
    created: function () {
        let data = JSON.parse(localStorage.getItem('cv'));
        for (key in data) {
            this[key] = data[key];
        }
    },
    computed: {
        age: function () {
            if (this.dateNaissance) {
                return Math.floor((new Date().getTime() - Date.parse(this.dateNaissance)) / (1000 * 60 * 60 * 24 * 365.25));
            }
        }
    },
    methods: {
        infoAdd: function () {
            if (this.nom != null && this.prenom != null && this.dateNaissance != null && this.adresse != null && this.phone != null && this.mail != null) {
                let date = this.dateNaissance.toString();
                this.infoPerso = { ddn: date, nom: this.nom, prenom: this.prenom, adresse: this.adresse, car: this.car };
            };
        },
        formAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateDebut)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateFin)).toString();
            let detail = this.formDetail.replaceAll("\n", "<br/>");
            this.formations.push({ nom: this.intitule, dateDebut: start, dateFin: end, detail: detail });
            this.intitule = null;
            this.formDateDebut = null;
            this.formDateFin = null;
            this.formDetail = null;
        },
        expAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.fctDateDebut)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.fctDateFin)).toString();
            this.experiences.push({ fonction: this.fonction, dateDebut: start, dateFin: end, detail: this.expDetail });
            this.fctDateDebut = null;
            this.fctDateFin = null;
            this.fonction = null;
            this.expDetail = null;
        },
        compAdd: function () {
            this.competences.push(this.comp);
            this.comp = null;
        },
        addPicture: function () {
            this.trombi = this.url
        },
        toLocalStorage: function () {
            localStorage.setItem('cv', JSON.stringify(this.$data))
        },
        clearLocalStorage: function () {
            if (confirm("Confirmez vous la suppression ?"))
                localStorage.removeItem('cv');
        }
    },
    components: {
        infoperso,
        formation,
        experiencepro,
        competences,
    }
});