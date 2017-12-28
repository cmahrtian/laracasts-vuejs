Vue.component('tabs', {
	// tabs template comes from Tabs Component in Bulma.io
	// tab-details = panel display below the tabs
	template: `
		<div>	
			<div class="tabs">
			  <ul>
			    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
						<a :href="tab.href" v-text="tab.name" @click="selectTab(tab)"></a>
			    </li>
			  </ul>
			</div>

			<div class="tabs-details">
				<slot></slot>
			</div>
		</div>
	`,
	// needs to be specified in order for values to be assigned to it
	// on the "created()" function below
	data() {
		return {
			tabs: []
		}
	},
	// assigns tabs array to value(s) of children
	created() {
		this.tabs = this.$children;
		// children = children of the <tabs> element (3 in all)
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.name == selectedTab.name);
			});
		}
	}
});

Vue.component('tab', {
	// template is a div with a TBD element slotted inside it
	template: `
		<div v-show="isActive"><slot></slot></div>
	`,
	// matches the properties in each <tab> element
	// these are immutable; use data function if you want to change them
	props: {
		// name property is required/necessary
		name: {
			required: true
		},
		// just assume that an element is NOT selected unless otherwise specified
		selected: {
			default: false
		}
	},
	data() {
		return {
			isActive: false
		}
	},
	computed: {
		href() {
			return '#' + this.name.toLowerCase().replace(/ /g, '-');
		}
	},
	mounted() {
		this.isActive = this.selected;
	}
});

new Vue({
	el: '#root'
});