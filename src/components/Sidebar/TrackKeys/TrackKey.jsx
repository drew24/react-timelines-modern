import React from 'react'
import PropTypes from 'prop-types'

import TrackKeys from './'
import ClickContext from '../../../contexts/ClickContext'

export const Component = ({ track, toggleOpen, clickTrackButton }) => {
  const {
    title,
    tracks,
    isOpen,
    hasButton,
    sideComponent
  } = track
  const isExpandable = isOpen !== undefined

  const buildSideComponent = () => {
    if (sideComponent) {
      return React.cloneElement(sideComponent)
    } else if (hasButton && clickTrackButton) {
      const handleClick = () => clickTrackButton(track)
      return <button className="rt-track-key__side-button" onClick={handleClick} />
    }

    return null
  }

  return (
    <li className="rt-track-key">
      <div className="rt-track-key__entry">
        { isExpandable &&
          <button
            title="Expand track"
            className={`rt-track-key__toggle ${isOpen ? 'rt-track-key__toggle--close' : 'rt-track-key__toggle--open'}`}
            onClick={() => toggleOpen(track)}
          >
            { isOpen ? 'Close' : 'Open' }
          </button>
        }
        <span className="rt-track-key__title">{title}</span>
        { buildSideComponent() }
      </div>
      { isOpen && tracks && tracks.length > 0 &&
        <TrackKeys tracks={tracks} toggleOpen={toggleOpen} />
      }
    </li>
  )
}

Component.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.shape({})),
    isOpen: PropTypes.bool,
    hasButton: PropTypes.bool
  }),
  toggleOpen: PropTypes.func,
  clickTrackButton: PropTypes.func
}

Component.defaultProps = {
  clickTrackButton: undefined
}

const TrackKey = props => (
  <ClickContext.Consumer>
    { ({ clickTrackButton }) => <Component {...props} clickTrackButton={clickTrackButton} /> }
  </ClickContext.Consumer>
)

export default TrackKey
