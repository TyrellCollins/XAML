try {
	var oldSel = fl.getDocumentDOM().selection;
	fl.getDocumentDOM().selectAll();
	for each(var elem in oldSel)
		elem.selected = false;
} catch(e) {}