<template>
	<div id="tab-bar">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style>
   #tab-bar {
     display: flex;
     position: fixed;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: #f6f6f6;
     align-items: bottom;
     box-shadow: 0px -3px rgb(100,100,100,.1);
   }
</style>
