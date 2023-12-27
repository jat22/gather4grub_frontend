const React = require("react");
const { render } = require("@testing-library/react");
// require("@testing-library/jest-dom/extend-expect";
const { MemoryRouter } = require("react-router-dom");
const App = require("../App")

it("renders", function(){
	render(
			<App/>
	)
})