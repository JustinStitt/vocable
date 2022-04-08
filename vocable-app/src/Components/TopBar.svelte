<script>
    export let toggleSettings = () => {};
</script>

<!-- begin HTML -->
<div class='navbar'>
    <div class='menu-left'></div>
    <div class='title'>Vocable</div>
    <div class='menu-right'>
        <svg on:click={toggleSettings} class='settings' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="aliceblue" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"></path>
        </svg>
    </div>
</div>
<!-- end HTML -->

<style>
    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        min-height: 20px;
        color: aliceblue;
        text-align: center;
        border-bottom: 2px solid grey;
        margin-bottom: 10px;
        padding-bottom: 7px;
    }

    .menu-right {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 50px;
	}

    .menu-left {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: blue;
		width: 50px;
	}

    .settings {
		justify-self: center;
		padding: 0 10px;
		margin-right: 10px;
	}

    .settings:hover {
		animation: 0.5s linear 0s forwards alternate settingsRotate, 0.5s linear 3.5s forwards reverse settingsRotate;
	}

    @keyframes settingsRotate {
		0% {
			transform: rotateZ(0);
		}
		100% {
			transform: rotateZ(180deg);
		}
	}

    .title {
		font-size: 40px;
		font-weight: 500;
		line-height: 100%;
		letter-spacing: 0.02em;
		text-align: center;
	}
</style>