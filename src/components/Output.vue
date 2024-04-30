<script>
import { store } from '/src/store';
export default {
    data() {
        return {
            store,
            structure: false,
            clickInfo: [null, null],
            setConst: true,
            info: false
        }
    },
    methods: {
        // recupera tutte le chiavi di un oggetto. Restituisce un oggetto
        getAllKeys(obj, value = false, history = 'STARTREAD') {
            let saveKeys = {};
            // se è un oggetto / array
            if (obj && typeof obj === 'object') {
                // recupera le chiavi
                let keys = Object.keys(obj);
                // se è un array prende il primo
                if (Array.isArray(obj)) {
                    saveKeys[history + '-' + 0] = typeof obj[0] === 'object' ? this.getAllKeys(obj[0], value, history + '-0') : value ? obj[0] : null;// se è un oggetto richiama la funzione altrimenti null (stessa cosa in basso)
                } else {
                    // se è un oggetto fa un foreach per vedere tutte le chiavi
                    keys.forEach((key) => {
                        saveKeys[history + '-' + key] = typeof obj[key] === 'object' ? this.getAllKeys(obj[key], value, history + '-' + key) : value ? obj[key] : null;
                    });
                }
                return saveKeys;
            }
            return null;
        },
        // gestice le line del json e se la linea ha una chiave
        isKey(line) {
            // prima dei due punti e senza spazi attorno
            line = line.split(':')[0].trim();
            const lineLenght = line.length;
            // se il primo e l'ultimo carattere sono "
            if(line[0] === '"' && line[lineLenght - 1] === '"'){
                // rimuove il primo e l'ultimo carattere e 'STARTREAD-'
                const key = line.substring(1, lineLenght - 1).replace('STARTREAD-', '');
                const splitKey = key.split('-');
                const keyLenght = splitKey.length;

                return [key, splitKey[keyLenght - 1]];
            }
            return false;
        },
        // seleziona la chiave
        selectKey(key, remove = false, add = false){
            const getInfo = this.clickInfo;
            const delay = 250;// 0.25 secondi
            // se l'ultima key selezionata è la stessa di quella corrente
            if(getInfo[0] === key){
                // se il tempo non è null ed è minore n secondi
                if(getInfo[1] !== null && (getInfo[1] + delay) - new Date().getTime() >= 0){
                    console.log('due click veloci');

                    if(this.addRemoveKeys(key, false, false, false, true) === 'add'){
                        // aggiunge
                        this.selectAllChildKeys(key, false, true);
                    }else{
                        // rimuove
                        this.selectAllChildKeys(key, true, false);
                    }
                }else{
                    //stessa chiave ma click più lenti
                    console.log('click stesso elemento lenti');
                    this.addRemoveKeys(key, false, false, true, false);
                }
                this.clickInfo = [null, null];
            }else{
                // chiave diversa
                this.addRemoveKeys(key, add, remove, true, true, true);
            }
        },
        // seleziona tutte le chiavi figlie
        selectAllChildKeys(key, remove = false, add = true){
            // divide le chiavi ed entra nel oggetto
            const keys = key.split('-');
            const lengthKeys = keys.length;
            let objCall = this.store.output;
            for(let i = 0; i < lengthKeys; i++){
                 objCall = objCall[keys[i]];
            }

            // seleziona le chiavi figlie
            const allChildKeys = JSON.stringify(this.getAllKeys(objCall, true, 'STARTREAD-' + key), null, 4).split('\n');
            for(let i = 0; i < allChildKeys.length; i++){
                const keyInfo = this.isKey(allChildKeys[i]);
                if(keyInfo !== false) {
                    this.selectKey(keyInfo[0], remove, add);
                }
            }
        },

        // gestisce le chiavi, se rimuoverle o no
        addRemoveKeys(key, add = false, remove = false, child = false, parent = false, special = false){
            if(special){
                // click singoli
                // figlio
                if(this.store.selectedKeys.includes(key)){
                    const index = this.store.selectedKeys.indexOf(key);
                    this.store.selectedKeys.splice(index, 1);

                    // genitore
                    if(this.store.parentKeys.includes(key)){
                        const index = this.store.parentKeys.indexOf(key);
                        this.store.parentKeys.splice(index, 1);
                        this.selectAllChildKeys(key, true);
                    }

                }else{
                    if(remove)return;
                    // altrimenti la aggiunge
                    this.store.selectedKeys.push(key);
                    this.clickInfo = [key, new Date().getTime()];
                }
                return;
            }
            if(add){
                // figlio
                if(!this.store.selectedKeys.includes(key) && child){
                    this.store.selectedKeys.push(key);
                }

                // genitore
                if(!this.store.parentKeys.includes(key) && parent){
                    this.store.parentKeys.push(key);
                }
            }

            if(remove){
                // figlio
                if(this.store.selectedKeys.includes(key) && child){
                    const index = this.store.selectedKeys.indexOf(key);
                    this.store.parentKeys.splice(index, 1);
                }

                // genitore
                if(this.store.parentKeys.includes(key) && parent){
                    const index = this.store.parentKeys.indexOf(key);
                    this.store.parentKeys.splice(index, 1);
                }
            }

            if(!add && !remove){
                // se non è definito il metodo fa in automatico
                // figlio
                if(child){
                    if(!this.store.selectedKeys.includes(key)){
                        this.store.selectedKeys.push(key);
                    }else{
                        const index = this.store.selectedKeys.indexOf(key);
                        this.store.selectedKeys.splice(index, 1);
                    }
                }

                // genitore
                if(parent){
                    if(!this.store.parentKeys.includes(key)){
                        this.store.parentKeys.push(key);
                        return 'add';
                    }else{
                        const index = this.store.parentKeys.indexOf(key);
                        this.store.parentKeys.splice(index, 1);
                        return 'remove';
                    }
                }
            }
        },
        // definisce se asgenare la classe per il css 'button-selected'
        setClassButtonSelected(key){
            if(store.selectedKeys.includes(key)){
                return true;
            }
            return false;
        },
        // definisce se asgenare la classe per il css 'button-selected'
        setClassParentSelected(key){
            if(store.parentKeys.includes(key)){
                return true;
            }
            return false;
        },
        // controlla se può essere un nome di variabile
        isValidVariableName(text) {
            // controlla se il testo inizia con una lettera, underscore o  dollaro
            if (!/^[a-zA-Z_$]/.test(text)) {
                return false;
            }
    
            // controlla se il testo contiene solo lettere, cifre, underscore o dollari
            if (!/^[a-zA-Z0-9_$]*$/.test(text)) {
                return false;
            }
    
            // controlla se il testo non è una parola chiave riservata di JavaScript
            const reservedKeywords = [
                'abstract', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const',
                'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends',
                'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
                'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private',
                'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw',
                'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
            ];
    
            if (reservedKeywords.includes(text)) {
                return false;
            }
    
            return true;
        },
        // rimuove i caratteri non validi per una variabile
        removeInvalidCharacters(text) {
            return text.replace(/[^a-zA-Z0-9_$]/g, '');
        },
        // retituisce le variabili d'esempio
        makeSampleCode(key) {
            const keys = key.split('-');
            const keysLength = keys.length;
            let variableName = '';
            let output = '';
           output += 'obj<span class="dot-output">.</span>' + keys[0];
           variableName = keys[0];
           const variableType = this.setConst ? 'const' : 'let';
            for(let i = 1; i < keysLength; i++){
                if(!isNaN(keys[i])){
                    output += '<span class="squares-output">[</span><span class="text-squares-output">' + keys[i]  +'</span><span class="squares-output">]</span>';
                }else{
                    output += '<span class="dot-output">.</span>' + keys[i];
                }
                variableName += keys[i].charAt(0).toUpperCase() + keys[i].slice(1); // rende la prima lettera maiuscola
            }
            let allText = '';
            variableName = this.removeInvalidCharacters(variableName);
            if(this.isValidVariableName(variableName)){
                allText = '<span class="set-variable">' + variableType + '</span> <span class="name-variable">' + variableName + '</span> <span class="end-variable">=</span> <span class="obj-output">' + output + '</span><span class="end-output">;</span>';
            }else{
                allText = '<span class="set-variable">' + variableType + '</span> <span class="name-variable">' + 'variableName' + '</span> <span class="end-variable">=</span> <span class="obj-output">' + output;
            }
            return allText;
        }
    }
}
</script>
<template>
    <!-- Caricamento -->
    <div v-if="store.loading" class="d-flex justify-content-center align-content-center flex-wrap my-5">
        <div class="spinner-border align-self-center border-5 text-primary"  style="height: 150px; width: 150px;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <h3 class="col-12 p-3 text-center text-primary">Loading...</h3>
    </div>
    <!-- Fine Caricamento -->
    <div v-if="store.output && !store.loading" class="d-flex border border-tertiary rounded-1 output overflow-hidden">
        <!-- Sezione Opzioni e Variabili -->
        <div class="left-box border-end col-12 col-lg-5 p-4 d-flex flex-column">
            <h5 class="text-center col-12">Options & Variables</h5>
            <hr class="w-75 mx-auto" />
            <div v-if="store.output" class="overflow-auto col-12 pt-0 overflow-size">
                <!-- Checkbox -->
                <div class="d-flex gap-3 justify-content-center">
                    <div class="form-check mb-3">
                        <input class="form-check-input shadow-none" type="checkbox" :value="!structure" id="form-structure"
                            v-model="structure">
                        <label class="form-check-label" for="form-structure">
                            Structure
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input shadow-none" type="checkbox" :value="!setConst" id="form-set-const"
                            v-model="setConst">
                        <label class="form-check-label" for="form-set-const">
                            Const variables
                        </label>
                    </div>
                </div>
                <hr class="w-50 mx-auto" />
                <!-- Fine Checkbox -->
                <!-- Variabili -->
                <table class="table">
                    <tbody>
                        <tr v-for="i in store.selectedKeys">
                            <td v-html=" makeSampleCode(i)" class="border border-0"></td>
                        </tr>
                    </tbody>
                </table>
                <!-- Fine Variabili -->
            </div>
        </div>
        <!-- Fine Sezione Opzioni e Variabili -->
        <!-- Sezione Json -->
        <div class="right-box col-12 col-lg-7 p-4 d-flex flex-column position-relative">
            <div class="position-absolute top-0 end-0 info-contaner text-end">
                <button type="button" class="btn ms-auto" @click="info = !info"><i class="fa-solid fa-circle-info text-primary"></i></button>
                <div v-if="info" class="text-start d-flex flex-wrap align-items-center info-text pb-3">
                    <ul class="col-6">
                        <li>With a single click on a key, selects the key itself</li>
                        <li>With a double click on the same key, selects all the child keys of that key</li>
                        <li style="list-style-type: none;"><h5 class="text-danger pt-1">Structure must be active!</h5></li>
                    </ul>
                    <video width="200" height="150" autoplay class="col-6">
                        <source src="../info.mp4" type="video/mp4">
                        Il tuo browser non supporta il tag video.
                    </video>
                </div>

            </div>
            <h5 class="text-center col-12">Output</h5>
            <hr class="w-75 mx-auto" />
            <div class="overflow-auto col-12 pt-0 overflow-size">
                <pre v-if="structure"><template v-for="line in JSON.stringify(this.getAllKeys(this.store.output, true), null, 4).split('\n')"><button v-if="isKey(line) !== false" :class="{'reset-button': true, 'button-selected' : setClassButtonSelected(isKey(line)[0]), 'parent-selected' : setClassParentSelected(isKey(line)[0])}" type="submit" @click="selectKey(isKey(line)[0])">{{ line.replace('STARTREAD-' + isKey(line)[0], isKey(line)[1]) }}</button><template v-else>{{ line }}</template><br></template></pre>
                <pre v-else v-html="JSON.stringify(this.store.output, null, 4)"></pre>
                {{ this.store.outputError }}
            </div>
        </div>
        <!-- Fine Sezione Json -->
    </div>
</template>

<style scoped lang="scss">
//contenitore
.output {
    height: 650px;
}

/* selezione chiavi*/
.reset-button {
    all: unset;
    cursor: pointer;
}
.button-selected {
    background-color: rgba(57, 198, 237, 0.3);
}
.parent-selected {
    background-color: rgba(57, 237, 177, 0.3);
}
// altezza fissa
.overflow-size{
    height: calc(100% - 48px);
}

.info-contaner {
        background-color: #212529;
        z-index: 2;
        button {
            font-size: 27px;
        }
        .info-text {
            border-bottom: 1px solid #495057;
        }
}
// responsive
@media screen and (max-width: 992px){
    .right-box {
        order: -1;
    }
    .left-box {
        border-top: 1px solid #495057;
        border-right: none !important;
    }
    .overflow-size{
        height: calc(40vh - 48px);
    }
    .output {
        height: auto;
        flex-wrap: wrap;
    }
}
</style>