module.exports = {
	apps : [{
		name: 'KIT App',
		script: 'app.js',
		watch: ['package.json', 'api/', 'config/', 'lib/', 'model/', 'routes/', 'util/'],
		instances: 1,
		exec_mode: 'cluster',
		env: {
			NODE_ENV: 'development',
			DEBUG: '*',
		},
		env_production: {
			NODE_ENV: 'production',
		},
		max_restarts: 10,
		min_uptime: 3000,
	}, {
		name: 'Notify User Cron',
		script: 'cron/notifyUser.js',
		watch: false,
		cron_restart: '*/30 * * * *',
		instances: 1,
		exec_mode: 'fork',
		autorestart: false,
	}],
};
