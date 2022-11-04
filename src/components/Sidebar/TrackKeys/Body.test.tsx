import { shallow } from "enzyme";

import Body from "./Body";
import TrackKeys from ".";

describe("<Body />", () => {
  it("renders <TrackKeys />", () => {
    const props = {
      tracks: [
        {
          id: "1",
          title: "Track 1",
        },
      ],
      toggleTrackOpen: jest.fn(),
    };
    const wrapper = shallow(<Body {...props} />);
    expect(wrapper.find(TrackKeys).exists()).toBe(true);
  });
});
