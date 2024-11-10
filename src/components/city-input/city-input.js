export class CityInput {
    constructor(s) {
        this.input = document.querySelector(s);
        this.suggestionsContainer = document.createElement('div');
        
        this.suggestionsContainer.classList.add('city-input__suggestions');
        
        this.input.parentNode.insertBefore(this.suggestionsContainer, this.input.nextSibling);
        
        this.input.addEventListener('input', () => this.fetchCities());
        
        this.suggestionsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('city-input__suggestions--item')) {
                this.input.value = e.target.textContent;
                this.suggestionsContainer.innerHTML = '';
            }
        });
        
        this.debounceTimeout = null;
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        
        this.input.addEventListener('input', this.handleInput);
        this.suggestionsContainer.addEventListener('click', this.handleSuggestionClick);
    }

    handleInput() {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => this.fetchCities(), 300);
    }

    async fetchCities() {
        const q = this.input.value;

        if (q.length < 2) {
            this.suggestionsContainer.innerHTML = '';
            return;
        }

        try {
            const r = await fetch(`http://localhost:4000/proxy?query=${encodeURIComponent(q)}`);
            if (!r.ok) {
                throw new Error(`HTTP error! status: ${r.status}`);
            }

            const d = await r.json();
            this.renderSuggestions(d.result);
        } catch (e) {
            console.error('Error fetching cities:', e);
            this.suggestionsContainer.innerHTML = '';
        }
    }

    renderSuggestions(c) {
        this.suggestionsContainer.innerHTML = '';

        c.forEach(i => {
            const t = document.createElement('div');
            t.classList.add('city-input__suggestions--item');
            t.textContent = i.name;
            this.suggestionsContainer.appendChild(t);
        });
    }

    destroy() {
        this.input.removeEventListener('input', this.handleInput);
        this.suggestionsContainer.removeEventListener('click', this.handleSuggestionClick);
        this.suggestionsContainer.remove();
    }

    handleSuggestionClick(e) {
        if (e.target.classList.contains('city-input__suggestions--item')) {
            this.input.value = e.target.textContent;
            this.suggestionsContainer.innerHTML = '';
        }
    }
}