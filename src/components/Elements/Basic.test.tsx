import { shallow, ShallowWrapper } from "enzyme";

import Basic from "./Basic";

type BasicProps = React.ComponentProps<typeof Basic>;

const defaultProps: BasicProps = {
  classes: [],
  dataSet: {},
  end: new Date("2017-02-01"),
  start: new Date("2017-01-01"),
  style: {},
  title: "",
  tooltip: "",
};

describe("<Basic />", () => {

  describe("Title", () => {
    it('should apply style to title', () => {
      const props = { ...defaultProps, titleStyle: { fontWeight: "bold" } };
      const wrapper = shallow(<Basic {...props} />);
      expect(wrapper.find(".rt-element__title").prop("style")).toHaveProperty('fontWeight', "bold");
    });
  });
  describe("Tooltip", () => {
    const getTooltip = (node: ShallowWrapper) =>
      node.find(".rt-element__tooltip");

    it("renders the tooltip value if it exists", () => {
      const tooltip = "Test tooltip";
      const props = { ...defaultProps, tooltip };
      const wrapper = shallow(<Basic {...props} />);
      expect(getTooltip(wrapper).html()).toMatch("Test tooltip");
    });

    it("handles multiline tooltips", () => {
      const tooltip = "Test\ntooltip";
      const props = { ...defaultProps, tooltip };
      const wrapper = shallow(<Basic {...props} />);
      expect(getTooltip(wrapper).html()).toMatch("Test<br>tooltip");
    });

    /* @todo: fix and enable this test */
    it.todo(
      "renders the title, formatted start and end date if the tooltip prop does not exist"
      // () => {
      //   const tooltip = "";
      //   const title = "TEST";
      //   const start = new Date("2017-03-20");
      //   const end = new Date("2017-04-15");
      //   const props = {
      //     ...defaultProps,
      //     tooltip,
      //     title,
      //     start,
      //     end,
      //   };
      //   const wrapper = shallow(<Basic {...props} />);
      //   expect(getTooltip(wrapper).text()).toMatch("TEST");
      //   expect(getTooltip(wrapper).text()).toMatch("Start 20 Mar");
      //   expect(getTooltip(wrapper).text()).toMatch("End 15 Apr");
      // }
    );

    it("can take an optional list of classnames to add to the parent", () => {
      const props = { ...defaultProps, classes: ["foo", "bar"] };
      const wrapper = shallow(<Basic {...props} />);
      expect(wrapper.find(".rt-element").hasClass("foo")).toBe(true);
      expect(wrapper.find(".rt-element").hasClass("bar")).toBe(true);
    });
  });

  describe("Data set", () => {
    it("should be able to set data-*", () => {
      const props = { ...defaultProps, dataSet: { foo: "boo", bar: "baz" } };
      const wrapper = shallow(<Basic {...props} />);
      expect(wrapper.props()["data-foo"]).toEqual("boo");
      expect(wrapper.props()["data-bar"]).toEqual("baz");
    });
  });
});
