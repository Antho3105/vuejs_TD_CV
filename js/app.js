let infoperso = {
    template: `
    <div>
    <h2>{{nom}} {{prenom}}</h2>
    <p v-if="adresse">Adresse : {{adresse}} </p>
    <p v-if="age">Age : {{age}} ans</p>
    <p>Voiture : {{vehicule}} </p>
</div>
    `,
    props: ['age', 'nom', 'prenom', 'adresse', 'car'],
    computed: {
        vehicule: function () {
            return (this.car) ? 'oui' : 'non'
        },
    },
};

let formation = {
    template: `
        <div>
        <h2>Formations</h2>
            <ul>
                <li v-for="i of formation">Du {{i.dateDebut}} au {{i.dateFin}} : {{i.nom}} </li>
            </ul>
        </div>
    `,
    props: ['formation'],
};

let experiencepro = {
    template: `
        <div>
        <h2>Expériences professionnelles</h2>
            <ul>
                <li v-for="i of experience">Du {{i.dateDebut}} au {{i.dateFin}} : {{i.fonction}}</li>
            </ul>
        </div>
    `,
    props: ['experience'],
};

let competences = {
    template: `
        <div>
        <h2>Compétences</h2>
            <ul>
                <li v-for="i of competence">{{i.competence}}</li>
            </ul>
        </div>
    `,
    props: ['competence'],
};

let vm = new Vue({
    el: '#app',
    data: {
        nom: '',
        prenom: '',
        dateNaissance: null,
        adresse: '',
        car: false,
        intitule: null,
        formDateDebut: null,
        formDateFin: null,
        formation: [],
        fonction: null,
        fctDateDebut: null,
        fctDateFin: null,
        experience: [],
        comp: null,
        competence: [],
        infoperso: [],
    },
    created: function () {

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
            let date = this.dateNaissance.toString()
            this.infoperso = [{ ddn: date }, { nom: this.nom }, { prenom: this.prenom }, { adresse: this.adresse }, { car: this.car }];
        },
        formAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateDebut)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateFin)).toString();
            this.formation.push({ nom: this.intitule, dateDebut: start, dateFin: end });
        },
        expAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.fctDateDebut)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.fctDateFin)).toString();
            this.experience.push({ fonction: this.fonction, dateDebut: start, dateFin: end });
        },
        compAdd: function () {
            this.competence.push({ competence: this.comp });
        },
    },
    components: {
        infoperso,
        formation,
        experiencepro,
        competences,
    }
});